"use client"

import * as React from "react"
import { X, Plus, Trash2, Save, ChevronDown } from "lucide-react"
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
import type { SalesOrder, OrderLine } from "@/lib/types"

interface SalesOrderEditPanelProps {
  order: SalesOrder
  onClose: () => void
  onSave: (order: SalesOrder) => void
}

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "confirmed", label: "Confirmed" },
  { value: "to_invoice", label: "To Invoice" },
  { value: "invoiced", label: "Invoiced" },
  { value: "cancelled", label: "Cancelled" },
]

const paymentTermsOptions = [
  { value: "Immediate", label: "Immediate Payment" },
  { value: "Net 15 Days", label: "Net 15 Days" },
  { value: "Net 30 Days", label: "Net 30 Days" },
  { value: "Net 45 Days", label: "Net 45 Days" },
  { value: "Net 60 Days", label: "Net 60 Days" },
]

const warehouseOptions = [
  { value: "Main Warehouse", label: "Main Warehouse" },
  { value: "Secondary Warehouse", label: "Secondary Warehouse" },
  { value: "Distribution Center", label: "Distribution Center" },
]

export function SalesOrderEditPanel({ order, onClose, onSave }: SalesOrderEditPanelProps) {
  const [formData, setFormData] = React.useState<SalesOrder>(order)

  const updateField = <K extends keyof SalesOrder>(field: K, value: SalesOrder[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateLine = (lineId: string, field: keyof OrderLine, value: number | string) => {
    setFormData((prev) => ({
      ...prev,
      lines: prev.lines.map((line) => {
        if (line.id === lineId) {
          const updated = { ...line, [field]: value }
          if (field === "quantity" || field === "unitPrice") {
            updated.total = updated.quantity * updated.unitPrice
          }
          return updated
        }
        return line
      }),
    }))
  }

  const removeLine = (lineId: string) => {
    setFormData((prev) => ({
      ...prev,
      lines: prev.lines.filter((l) => l.id !== lineId),
    }))
  }

  const addLine = () => {
    const newLine: OrderLine = {
      id: `new-${Date.now()}`,
      product: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    }
    setFormData((prev) => ({
      ...prev,
      lines: [...prev.lines, newLine],
    }))
  }

  const calculateTotal = () => {
    return formData.lines.reduce((sum, line) => sum + line.total, 0)
  }

  const handleSave = () => {
    const updatedOrder = {
      ...formData,
      total: calculateTotal(),
    }
    onSave(updatedOrder)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: formData.currency,
    }).format(amount)
  }

  return (
    <aside className="w-[520px] border-l border-border bg-card overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
      {/* Panel Header */}
      <div className="sticky top-0 bg-card p-4 border-b border-border flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-foreground">Edit Order</h3>
          <span className="text-sm text-accent font-semibold">{order.id}</span>
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
        {/* Order Information Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Order Information</h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">Status</Label>
              <Select value={formData.status} onValueChange={(v) => updateField("status", v as SalesOrder["status"])}>
                <SelectTrigger>
                  <SelectValue />
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

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">Order Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => updateField("date", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">Payment Terms</Label>
              <Select value={formData.paymentTerms} onValueChange={(v) => updateField("paymentTerms", v)}>
                <SelectTrigger>
                  <SelectValue />
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
              <Label className="text-xs font-semibold text-muted-foreground uppercase">Warehouse</Label>
              <Select value={formData.warehouse} onValueChange={(v) => updateField("warehouse", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {warehouseOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Customer Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Customer</h4>
          </div>

          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-bold">
                {formData.customer.initials}
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground">{formData.customer.name}</p>
                <p className="text-xs text-muted-foreground">{formData.customer.email}</p>
                <p className="text-xs text-muted-foreground">{formData.customer.phone}</p>
              </div>
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>
          </div>
        </section>

        {/* Order Lines Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Order Lines</h4>
            <Button variant="outline" size="sm" className="gap-1" onClick={addLine}>
              <Plus className="h-3 w-3" />
              Add Line
            </Button>
          </div>

          <div className="space-y-3">
            {/* Lines Header */}
            <div className="grid grid-cols-[1fr,80px,100px,100px,32px] gap-2 text-[10px] font-bold text-muted-foreground uppercase px-1">
              <span>Product</span>
              <span className="text-right">Qty</span>
              <span className="text-right">Unit Price</span>
              <span className="text-right">Total</span>
              <span></span>
            </div>

            {/* Line Items */}
            {formData.lines.map((line) => (
              <div
                key={line.id}
                className="grid grid-cols-[1fr,80px,100px,100px,32px] gap-2 items-center p-2 rounded-lg bg-muted/30 border border-border"
              >
                <Input
                  value={line.product}
                  onChange={(e) => updateLine(line.id, "product", e.target.value)}
                  placeholder="Product name"
                  className="h-8 text-sm"
                />
                <Input
                  type="number"
                  min={1}
                  value={line.quantity}
                  onChange={(e) => updateLine(line.id, "quantity", Number(e.target.value))}
                  className="h-8 text-sm text-right"
                />
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={line.unitPrice}
                  onChange={(e) => updateLine(line.id, "unitPrice", Number(e.target.value))}
                  className="h-8 text-sm text-right"
                />
                <div className="text-sm font-medium text-right pr-2">
                  {formatCurrency(line.total)}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeLine(line.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {formData.lines.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No order lines. Click "Add Line" to add products.
              </div>
            )}
          </div>

          {/* Order Total */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-sm font-bold text-foreground">Order Total</span>
            <span className="text-lg font-bold text-accent">{formatCurrency(calculateTotal())}</span>
          </div>
        </section>

        {/* Notes Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Notes</h4>
          </div>
          <textarea
            className="w-full min-h-[80px] px-3 py-2 text-sm rounded-lg border border-border bg-muted/30 resize-none focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Add notes about this order..."
            value={formData.notes || ""}
            onChange={(e) => updateField("notes", e.target.value)}
          />
        </section>
      </div>
    </aside>
  )
}
