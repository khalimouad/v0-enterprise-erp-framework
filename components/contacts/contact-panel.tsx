"use client"

import * as React from "react"
import { X, Mail, Phone, MapPin, CreditCard, Calendar, Tag, Edit, ShoppingCart, FileText, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Contact } from "@/lib/types"
import { contactTypeConfig } from "@/lib/types"

interface ContactPanelProps {
  contact: Contact
  onClose: () => void
  onEdit: () => void
}

// Simulated related records
const getRelatedOrders = (contactId: string) => [
  { id: "SO-2023-001", date: "Oct 12, 2023", total: "$1,240.00", status: "Confirmed" },
  { id: "SO-2023-042", date: "Oct 14, 2023", total: "$450.00", status: "Quotation" },
  { id: "SO-2023-115", date: "Oct 20, 2023", total: "$2,890.00", status: "Invoiced" },
]

const getRelatedInvoices = (contactId: string) => [
  { id: "INV-2023-089", date: "Oct 20, 2023", total: "$2,890.00", status: "Paid" },
  { id: "INV-2023-045", date: "Oct 12, 2023", total: "$1,240.00", status: "Pending" },
]

export function ContactPanel({ contact, onClose, onEdit }: ContactPanelProps) {
  const typeCfg = contact.type ? contactTypeConfig[contact.type] : null
  const relatedOrders = getRelatedOrders(contact.id)
  const relatedInvoices = getRelatedInvoices(contact.id)

  const [activeTab, setActiveTab] = React.useState<"orders" | "invoices">("orders")

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <aside className="w-[420px] border-l border-border bg-card overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
      {/* Panel Header */}
      <div className="sticky top-0 bg-card p-4 border-b border-border flex items-center justify-between z-10">
        <h3 className="font-bold text-foreground">Contact Details</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      <div className="p-6 space-y-6">
        {/* Header Info */}
        <div className="flex items-start gap-4">
          <div className="size-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-xl font-bold">
            {contact.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground truncate">{contact.name}</h2>
              {(contact.customerRank ?? 0) >= 4 && (
                <Star className="h-4 w-4 text-amber-500 fill-amber-500 shrink-0" />
              )}
            </div>
            {typeCfg && (
              <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold mt-1", typeCfg.className)}>
                {typeCfg.label}
              </span>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${contact.email}`} className="text-accent hover:underline">{contact.email}</a>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <a href={`tel:${contact.phone}`} className="text-foreground">{contact.phone}</a>
          </div>
          {(contact.city || contact.country) && (
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">
                {contact.address && `${contact.address}, `}
                {contact.city && `${contact.city}, `}
                {contact.country}
              </span>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-muted/50 border border-border">
            <span className="text-xs text-muted-foreground">Payment Terms</span>
            <p className="text-sm font-medium text-foreground">{contact.paymentTerms || "Not set"}</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50 border border-border">
            <span className="text-xs text-muted-foreground">Currency</span>
            <p className="text-sm font-medium text-foreground">{contact.currency || "USD"}</p>
          </div>
          {contact.createdAt && (
            <div className="p-3 rounded-lg bg-muted/50 border border-border col-span-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Customer since {formatDate(contact.createdAt)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        {contact.tags && contact.tags.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
              <Tag className="h-3 w-3" />
              Tags
            </div>
            <div className="flex flex-wrap gap-2">
              {contact.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Records Tabs */}
        <div className="space-y-3">
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("orders")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                activeTab === "orders"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <ShoppingCart className="h-4 w-4" />
              Sales Orders ({relatedOrders.length})
            </button>
            <button
              onClick={() => setActiveTab("invoices")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                activeTab === "invoices"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <FileText className="h-4 w-4" />
              Invoices ({relatedInvoices.length})
            </button>
          </div>

          {/* Related Records List */}
          <div className="space-y-2">
            {activeTab === "orders" && relatedOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border hover:border-accent/30 cursor-pointer transition-colors">
                <div>
                  <p className="text-sm font-medium text-accent">{order.id}</p>
                  <p className="text-[10px] text-muted-foreground">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{order.total}</p>
                  <p className="text-[10px] text-muted-foreground">{order.status}</p>
                </div>
              </div>
            ))}
            {activeTab === "invoices" && relatedInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border hover:border-accent/30 cursor-pointer transition-colors">
                <div>
                  <p className="text-sm font-medium text-accent">{invoice.id}</p>
                  <p className="text-[10px] text-muted-foreground">{invoice.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{invoice.total}</p>
                  <p className="text-[10px] text-muted-foreground">{invoice.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 space-y-2">
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2" onClick={onEdit}>
            <Edit className="h-4 w-4" />
            Edit Contact
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Phone className="h-4 w-4" />
              Call
            </Button>
          </div>
          <Button variant="outline" className="w-full gap-2">
            <ShoppingCart className="h-4 w-4" />
            Create Sale Order
          </Button>
        </div>
      </div>
    </aside>
  )
}
