"use client"

import * as React from "react"
import { X, ExternalLink, Mail, FileText, Printer, Edit } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { SalesOrder } from "@/lib/types"
import { salesStatusConfig } from "@/lib/types"

interface SalesOrderPanelProps {
  order: SalesOrder
  onClose: () => void
  onEdit: () => void
}

export function SalesOrderPanel({ order, onClose, onEdit }: SalesOrderPanelProps) {
  const statusCfg = salesStatusConfig[order.status]

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <aside className="w-[420px] border-l border-border bg-card overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
      {/* Panel Header */}
      <div className="sticky top-0 bg-card p-4 border-b border-border flex items-center justify-between z-10">
        <h3 className="font-bold text-foreground">Order Details</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      <div className="p-6 space-y-6">
        {/* Header Info */}
        <div className="space-y-2">
          <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide", statusCfg.className)}>
            {statusCfg.label}
          </span>
          <h2 className="text-2xl font-black text-accent">{order.id}</h2>
          <p className="text-sm text-muted-foreground">
            Created by {order.salesperson} on {formatDate(order.date)}
          </p>
        </div>

        {/* Customer Many2One Info */}
        <div className="p-4 rounded-xl bg-muted/50 border border-border">
          <div className="text-xs font-bold text-muted-foreground uppercase mb-3">Customer Information</div>
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-bold">
              {order.customer.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground">{order.customer.name}</p>
              <p className="text-xs text-muted-foreground truncate">{order.customer.email}</p>
              <p className="text-xs text-muted-foreground">{order.customer.phone}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <ExternalLink className="h-4 w-4 text-accent" />
            </Button>
          </div>
        </div>

        {/* Quick Totals */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Total Amount</span>
            <p className="text-lg font-bold text-foreground">{formatCurrency(order.total, order.currency)}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Payment Terms</span>
            <p className="text-sm font-medium text-foreground">{order.paymentTerms}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Warehouse</span>
            <p className="text-sm font-medium text-foreground">{order.warehouse}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Salesperson</span>
            <p className="text-sm font-medium text-foreground">{order.salesperson}</p>
          </div>
        </div>

        {/* Line Items Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase">
              Order Lines ({order.lines.length})
            </span>
            <button className="text-accent text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-2">
            {order.lines.map((line) => (
              <div key={line.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{line.product}</p>
                  <p className="text-[10px] text-muted-foreground">
                    Qty: {line.quantity} x {formatCurrency(line.unitPrice, order.currency)}
                  </p>
                </div>
                <span className="text-sm font-bold text-foreground">{formatCurrency(line.total, order.currency)}</span>
              </div>
            ))}
          </div>
          {/* Subtotal */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-sm font-bold text-foreground">Subtotal</span>
            <span className="text-sm font-bold text-foreground">{formatCurrency(order.total, order.currency)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 space-y-2">
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2" onClick={onEdit}>
            <Edit className="h-4 w-4" />
            Edit Order
          </Button>
          <Button variant="outline" className="w-full gap-2">
            <Mail className="h-4 w-4" />
            Send by Email
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-2">
              <FileText className="h-4 w-4" />
              Create Invoice
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Printer className="h-4 w-4" />
              Print
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}
