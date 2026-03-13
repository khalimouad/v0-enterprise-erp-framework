"use client"

import * as React from "react"
import { Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { Contact } from "@/lib/types"

interface ContactDetailsFormProps {
  contact: Contact
  onChange: (contact: Contact) => void
  onSave?: () => void
  onCancel?: () => void
}

export function ContactDetailsForm({
  contact,
  onChange,
  onSave,
  onCancel,
}: ContactDetailsFormProps) {
  const [tagInput, setTagInput] = React.useState("")
  
  const handleChange = (field: keyof Contact, value: any) => {
    onChange({ ...contact, [field]: value })
  }

  const handleAddTag = () => {
    if (tagInput.trim() && (!contact.tags?.includes(tagInput.trim()))) {
      handleChange("tags", [...(contact.tags || []), tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    handleChange("tags", contact.tags?.filter((t) => t !== tag) || [])
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white dark:bg-slate-900">
      {/* Header Section - Name, ICE, Type, Tags */}
      <div className="border-b border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800">
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Contact Name
            </Label>
            <Input
              id="name"
              value={contact.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter contact name"
              className="mt-1 bg-white dark:bg-slate-700"
            />
          </div>

          {/* ICE, Type, Status - 3 columns on desktop, stack on mobile */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="ice" className="text-sm font-medium">
                ICE Number
              </Label>
              <Input
                id="ice"
                value={contact.ice || ""}
                onChange={(e) => handleChange("ice", e.target.value)}
                placeholder="Tax ID number"
                className="mt-1 bg-white dark:bg-slate-700"
              />
            </div>
            <div>
              <Label htmlFor="type" className="text-sm font-medium">
                Type
              </Label>
              <Select
                value={contact.type || "customer"}
                onValueChange={(value) =>
                  handleChange("type", value as Contact["type"])
                }
              >
                <SelectTrigger className="mt-1 bg-white dark:bg-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="supplier">Supplier</SelectItem>
                  <SelectItem value="both">Customer & Supplier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <Select
                value={contact.status || "active"}
                onValueChange={(value) =>
                  handleChange("status", value as Contact["status"])
                }
              >
                <SelectTrigger className="mt-1 bg-white dark:bg-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="prospect">Prospect</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags" className="text-sm font-medium">
              Tags
            </Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {contact.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-2"
                >
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                placeholder="Add tag and press Enter"
                className="bg-white dark:bg-slate-700"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddTag}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area with Tabs */}
      <Tabs defaultValue="general" className="flex flex-1 flex-col overflow-hidden">
        <TabsList className="border-b bg-slate-50 dark:bg-slate-800">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="tax">Tax & Compliance</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent
          value="general"
          className="flex-1 overflow-y-auto p-6"
        >
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Ranking & Ratings</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="customerRank" className="text-sm font-medium">
                    Customer Rank
                  </Label>
                  <Select
                    value={String(contact.customerRank || "1")}
                    onValueChange={(value) =>
                      handleChange("customerRank", parseInt(value))
                    }
                  >
                    <SelectTrigger className="mt-1 bg-slate-50 dark:bg-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((rank) => (
                        <SelectItem key={rank} value={String(rank)}>
                          {rank} Star{rank !== 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="supplierRank" className="text-sm font-medium">
                    Supplier Rank
                  </Label>
                  <Select
                    value={String(contact.supplierRank || "1")}
                    onValueChange={(value) =>
                      handleChange("supplierRank", parseInt(value))
                    }
                  >
                    <SelectTrigger className="mt-1 bg-slate-50 dark:bg-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((rank) => (
                        <SelectItem key={rank} value={String(rank)}>
                          {rank} Star{rank !== 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="industry" className="text-sm font-medium">
                    Industry
                  </Label>
                  <Input
                    id="industry"
                    value={contact.industry || ""}
                    onChange={(e) => handleChange("industry", e.target.value)}
                    placeholder="Industry sector"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Contact Info Tab */}
        <TabsContent
          value="contact"
          className="flex-1 overflow-y-auto p-6"
        >
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contact Details</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={contact.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="email@example.com"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={contact.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <Label htmlFor="mobile" className="text-sm font-medium">
                    Mobile
                  </Label>
                  <Input
                    id="mobile"
                    value={contact.mobile || ""}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    placeholder="Mobile number"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <Label htmlFor="website" className="text-sm font-medium">
                    Website
                  </Label>
                  <Input
                    id="website"
                    value={contact.website || ""}
                    onChange={(e) => handleChange("website", e.target.value)}
                    placeholder="https://example.com"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Address Tab */}
        <TabsContent
          value="address"
          className="flex-1 overflow-y-auto p-6"
        >
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Address Information</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="md:col-span-3">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Street Address
                  </Label>
                  <Input
                    id="address"
                    value={contact.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Street address"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="text-sm font-medium">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={contact.city || ""}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="City"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <Label htmlFor="quartier" className="text-sm font-medium">
                    Neighborhood
                  </Label>
                  <Input
                    id="quartier"
                    value={contact.quartier || ""}
                    onChange={(e) => handleChange("quartier", e.target.value)}
                    placeholder="Quartier"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode" className="text-sm font-medium">
                    Postal Code
                  </Label>
                  <Input
                    id="postalCode"
                    value={contact.postalCode || ""}
                    onChange={(e) => handleChange("postalCode", e.target.value)}
                    placeholder="Postal code"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <Label htmlFor="region" className="text-sm font-medium">
                    Region
                  </Label>
                  <Input
                    id="region"
                    value={contact.region || ""}
                    onChange={(e) => handleChange("region", e.target.value)}
                    placeholder="Region"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <Label htmlFor="country" className="text-sm font-medium">
                    Country
                  </Label>
                  <Input
                    id="country"
                    value={contact.country || "Maroc"}
                    onChange={(e) => handleChange("country", e.target.value)}
                    placeholder="Country"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tax & Compliance Tab */}
        <TabsContent
          value="tax"
          className="flex-1 overflow-y-auto p-6"
        >
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Tax Settings</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="taxRegime" className="text-sm font-medium">
                    Tax Regime
                  </Label>
                  <Select
                    value={contact.taxRegime || "real"}
                    onValueChange={(value) =>
                      handleChange("taxRegime", value as Contact["taxRegime"])
                    }
                  >
                    <SelectTrigger className="mt-1 bg-slate-50 dark:bg-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="foret">Forfait</SelectItem>
                      <SelectItem value="real">Real</SelectItem>
                      <SelectItem value="simplified">Simplified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="vatNumber" className="text-sm font-medium">
                    VAT Number
                  </Label>
                  <Input
                    id="vatNumber"
                    value={contact.vatNumber || ""}
                    onChange={(e) => handleChange("vatNumber", e.target.value)}
                    placeholder="VAT number"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <h3 className="mb-4 text-lg font-semibold">VAT Status</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="vatSubject"
                    checked={contact.vatSubject || false}
                    onChange={(e) => handleChange("vatSubject", e.target.checked)}
                    className="h-4 w-4 rounded"
                  />
                  <Label htmlFor="vatSubject" className="text-sm font-medium">
                    Subject to VAT
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isSuspended"
                    checked={contact.isSuspended || false}
                    onChange={(e) => handleChange("isSuspended", e.target.checked)}
                    className="h-4 w-4 rounded"
                  />
                  <Label htmlFor="isSuspended" className="text-sm font-medium">
                    VAT Suspended
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isProvisional"
                    checked={contact.isProvisional || false}
                    onChange={(e) => handleChange("isProvisional", e.target.checked)}
                    className="h-4 w-4 rounded"
                  />
                  <Label htmlFor="isProvisional" className="text-sm font-medium">
                    Provisional (No ICE Yet)
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isExport"
                    checked={contact.isExport || false}
                    onChange={(e) => handleChange("isExport", e.target.checked)}
                    className="h-4 w-4 rounded"
                  />
                  <Label htmlFor="isExport" className="text-sm font-medium">
                    Export Business
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Company Tab */}
        <TabsContent
          value="company"
          className="flex-1 overflow-y-auto p-6"
        >
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Financial Settings</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="currency" className="text-sm font-medium">
                    Currency
                  </Label>
                  <Select
                    value={contact.currency || "MAD"}
                    onValueChange={(value) =>
                      handleChange("currency", value)
                    }
                  >
                    <SelectTrigger className="mt-1 bg-slate-50 dark:bg-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MAD">MAD (Moroccan Dirham)</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="paymentTerms" className="text-sm font-medium">
                    Payment Terms
                  </Label>
                  <Select
                    value={contact.paymentTerms || "Net 30 Days"}
                    onValueChange={(value) =>
                      handleChange("paymentTerms", value)
                    }
                  >
                    <SelectTrigger className="mt-1 bg-slate-50 dark:bg-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Immediate">Immediate</SelectItem>
                      <SelectItem value="Net 15 Days">Net 15 Days</SelectItem>
                      <SelectItem value="Net 30 Days">Net 30 Days</SelectItem>
                      <SelectItem value="Net 45 Days">Net 45 Days</SelectItem>
                      <SelectItem value="Net 60 Days">Net 60 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <h3 className="mb-4 text-lg font-semibold">Credit</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isCreditAllowed"
                    checked={contact.isCreditAllowed || false}
                    onChange={(e) => handleChange("isCreditAllowed", e.target.checked)}
                    className="h-4 w-4 rounded"
                  />
                  <Label htmlFor="isCreditAllowed" className="text-sm font-medium">
                    Credit Allowed
                  </Label>
                </div>
                {contact.isCreditAllowed && (
                  <div>
                    <Label htmlFor="creditLimit" className="text-sm font-medium">
                      Credit Limit
                    </Label>
                    <Input
                      id="creditLimit"
                      type="number"
                      value={contact.creditLimit || 0}
                      onChange={(e) =>
                        handleChange("creditLimit", parseFloat(e.target.value))
                      }
                      placeholder="0.00"
                      className="mt-1 bg-slate-50 dark:bg-slate-700"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Save Button Footer */}
      <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800">
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
