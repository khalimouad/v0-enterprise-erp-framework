"use client"

import * as React from "react"
import { Save } from "lucide-react"
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
import type { Contact } from "@/lib/types"

interface ContactDetailsFormProps {
  contact: Contact
  onChange: (contact: Contact) => void
}

export function ContactDetailsForm({
  contact,
  onChange,
}: ContactDetailsFormProps) {
  const handleChange = (field: keyof Contact, value: any) => {
    onChange({ ...contact, [field]: value })
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white dark:bg-slate-900">
      {/* Tabs for different sections */}
      <Tabs defaultValue="general" className="flex h-full flex-col">
        <TabsList className="border-b">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent
          value="general"
          className="flex-1 overflow-y-auto p-6"
        >
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Basic Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    value={contact.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={contact.type || "customer"}
                    onValueChange={(value) =>
                      handleChange("type", value as Contact["type"])
                    }
                  >
                    <SelectTrigger className="bg-slate-50 dark:bg-slate-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="supplier">Supplier</SelectItem>
                      <SelectItem value="both">
                        Customer & Supplier
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={contact.status || "active"}
                    onValueChange={(value) =>
                      handleChange("status", value as Contact["status"])
                    }
                  >
                    <SelectTrigger className="bg-slate-50 dark:bg-slate-800">
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
            </div>

            <div className="border-t pt-6">
              <h3 className="mb-4 text-lg font-semibold">Rankings & Tags</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerRank">Customer Rank</Label>
                  <Select
                    value={String(contact.customerRank || "1")}
                    onValueChange={(value) =>
                      handleChange("customerRank", parseInt(value))
                    }
                  >
                    <SelectTrigger className="bg-slate-50 dark:bg-slate-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((rank) => (
                        <SelectItem key={rank} value={String(rank)}>
                          {rank} Star{"s" !== "s" ? "" : "s"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplierRank">Supplier Rank</Label>
                  <Select
                    value={String(contact.supplierRank || "1")}
                    onValueChange={(value) =>
                      handleChange("supplierRank", parseInt(value))
                    }
                  >
                    <SelectTrigger className="bg-slate-50 dark:bg-slate-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((rank) => (
                        <SelectItem key={rank} value={String(rank)}>
                          {rank} Star{"s" !== "s" ? "" : "s"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={contact.industry || ""}
                    onChange={(e) => handleChange("industry", e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800"
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
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contact.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={contact.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={contact.website || ""}
                    onChange={(e) => handleChange("website", e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="mb-4 text-lg font-semibold">Address</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={contact.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={contact.city || ""}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={contact.country || ""}
                    onChange={(e) => handleChange("country", e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800"
                  />
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
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={contact.currency || "USD"}
                    onValueChange={(value) =>
                      handleChange("currency", value)
                    }
                  >
                    <SelectTrigger className="bg-slate-50 dark:bg-slate-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select
                    value={contact.paymentTerms || "Net 30 Days"}
                    onValueChange={(value) =>
                      handleChange("paymentTerms", value)
                    }
                  >
                    <SelectTrigger className="bg-slate-50 dark:bg-slate-800">
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
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    placeholder="Additional notes"
                    className="bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Save Button Footer */}
      <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800">
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
