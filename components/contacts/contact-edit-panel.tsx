"use client"

import * as React from "react"
import { X, Save, Plus, User, Building, CreditCard, Globe, Tag } from "lucide-react"
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
import type { ColorTheme } from "@/components/erp-header"

interface ContactEditPanelProps {
  contact: Contact
  onClose: () => void
  onSave: (contact: Contact) => void
  colorTheme?: ColorTheme
}

const typeOptions = [
  { value: "customer", label: "Customer" },
  { value: "supplier", label: "Supplier" },
  { value: "both", label: "Customer & Supplier" },
]

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "prospect", label: "Prospect" },
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
  { value: "Sweden", label: "Sweden" },
]

const industryOptions = [
  { value: "Technology", label: "Technology" },
  { value: "Manufacturing", label: "Manufacturing" },
  { value: "Retail", label: "Retail" },
  { value: "Services", label: "Services" },
  { value: "Trading", label: "Trading" },
  { value: "Distribution", label: "Distribution" },
  { value: "Import/Export", label: "Import/Export" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Finance", label: "Finance" },
]

export function ContactEditPanel({ contact, onClose, onSave, colorTheme = "slate" }: ContactEditPanelProps) {
  const [formData, setFormData] = React.useState<Contact>(contact)
  const [newTag, setNewTag] = React.useState("")

  const isNewContact = !contact.name

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
      .slice(0, 2) || "NC"

    onSave({
      ...formData,
      initials,
    })
  }

  const getAccentClass = () => {
    switch (colorTheme) {
      case "orange": return "bg-orange-500 text-white hover:bg-orange-600"
      case "navy": return "bg-blue-700 text-white hover:bg-blue-800"
      default: return "bg-slate-700 text-white hover:bg-slate-800"
    }
  }

  const getAccentTextClass = () => {
    switch (colorTheme) {
      case "orange": return "text-orange-600"
      case "navy": return "text-blue-700"
      default: return "text-slate-700"
    }
  }

  const getAccentBgClass = () => {
    switch (colorTheme) {
      case "orange": return "bg-orange-500/5 border-orange-500/10"
      case "navy": return "bg-blue-700/5 border-blue-700/10"
      default: return "bg-slate-600/5 border-slate-600/10"
    }
  }

  return (
    <aside className="w-[520px] border-l border-border bg-card overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
      {/* Panel Header */}
      <div className="sticky top-0 bg-card p-4 border-b border-border flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-foreground">{isNewContact ? "New Contact" : "Edit Contact"}</h3>
          {!isNewContact && (
            <span className={cn("text-sm font-semibold", getAccentTextClass())}>{contact.name}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" className={cn("gap-2", getAccentClass())} onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* General Information Section */}
        <section className="space-y-4">
          <div className={cn("flex items-center gap-2 pb-2 border-b border-border")}>
            <User className={cn("h-4 w-4", getAccentTextClass())} />
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

            <div className="grid grid-cols-2 gap-4">
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
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground uppercase">Status</Label>
                <Select value={formData.status} onValueChange={(v) => updateField("status", v as Contact["status"])}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground uppercase">Industry</Label>
                <Select value={formData.industry || ""} onValueChange={(v) => updateField("industry", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industryOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground uppercase">Website</Label>
                <Input
                  value={formData.website || ""}
                  onChange={(e) => updateField("website", e.target.value)}
                  placeholder="www.example.com"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Address Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Globe className={cn("h-4 w-4", getAccentTextClass())} />
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
            <CreditCard className={cn("h-4 w-4", getAccentTextClass())} />
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

          <div className={cn("p-4 rounded-lg border", getAccentBgClass())}>
            <div className="flex items-start gap-3">
              <CreditCard className={cn("h-4 w-4 mt-0.5", getAccentTextClass())} />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tax settings are automatically derived based on the selected country and currency.
              </p>
            </div>
          </div>
        </section>

        {/* Tags Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Tag className={cn("h-4 w-4", getAccentTextClass())} />
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
