"use client"

import * as React from "react"
import { X, Save, Plus, User, Building, CreditCard, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Contact } from "@/lib/types"

interface ContactEditPanelProps {
  contact: Contact
  onClose: () => void
  onSave: (contact: Contact) => void
}

const typeOptions = [
  { value: "customer", label: "Customer" },
  { value: "supplier", label: "Supplier" },
  { value: "both", label: "Customer & Supplier" },
]

const paymentTermsOptions = [
  { value: "Immediate", label: "Immediate Payment" },
  { value: "Net 15 Days", label: "Net 15 Days" },
  { value: "Net 30 Days", label: "Net 30 Days" },
  { value: "Net 45 Days", label: "Net 45 Days" },
  { value: "Net 60 Days", label: "Net 60 Days" },
]

const currencyOptions = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "CNY", label: "CNY - Chinese Yuan" },
]

const countryOptions = [
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
  { value: "China", label: "China" },
  { value: "Japan", label: "Japan" },
  { value: "Australia", label: "Australia" },
]

export function ContactEditPanel({ contact, onClose, onSave }: ContactEditPanelProps) {
  const [formData, setFormData] = React.useState<Contact>(contact)
  const [newTag, setNewTag] = React.useState("")

  const updateField = <K extends keyof Contact>(field: K, value: Contact[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tag),
    }))
  }

  const handleSave = () => {
    // Generate initials from name
    const initials = formData.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

    onSave({
      ...formData,
      initials,
    })
  }

  return (
    <aside className="w-[520px] border-l border-border bg-card overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
      {/* Panel Header */}
      <div className="sticky top-0 bg-card p-4 border-b border-border flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-foreground">Edit Contact</h3>
          <span className="text-sm text-accent font-semibold">{contact.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2" onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* General Information Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <User className="h-4 w-4 text-accent" />
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">General Information</h4>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Company or person name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground uppercase">Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground uppercase">Phone</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+1 234 567 890"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">Contact Type</Label>
              <Select value={formData.type} onValueChange={(v) => updateField("type", v as Contact["type"])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Address Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Globe className="h-4 w-4 text-accent" />
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Address</h4>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">Street Address</Label>
              <Input
                value={formData.address || ""}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="Street address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground uppercase">City</Label>
                <Input
                  value={formData.city || ""}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="City"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground uppercase">Country</Label>
                <Select value={formData.country || ""} onValueChange={(v) => updateField("country", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Accounting Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <CreditCard className="h-4 w-4 text-accent" />
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Accounting</h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">Payment Terms</Label>
              <Select value={formData.paymentTerms || ""} onValueChange={(v) => updateField("paymentTerms", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select terms" />
                </SelectTrigger>
                <SelectContent>
                  {paymentTermsOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">Currency</Label>
              <Select value={formData.currency || "USD"} onValueChange={(v) => updateField("currency", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencyOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
            <div className="flex items-start gap-3">
              <CreditCard className="h-4 w-4 text-accent mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tax settings are automatically derived based on the selected country and currency.
              </p>
            </div>
          </div>
        </section>

        {/* Tags Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Building className="h-4 w-4 text-accent" />
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Tags</h4>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                onKeyDown={(e) => e.key === "Enter" && addTag()}
              />
              <Button variant="outline" size="icon" onClick={addTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {formData.tags && formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </aside>
  )
}
