"use client"

import * as React from "react"
import { Trash2, Save, Plus, Edit2, Check, X } from "lucide-react"
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
  const [editingRowIndex, setEditingRowIndex] = React.useState<number | null>(null)
  const [editValues, setEditValues] = React.useState({
    name: "",
    function: "",
    email: "",
    phone: "",
  })
  const [newContact, setNewContact] = React.useState({
    name: "",
    function: "",
    email: "",
    phone: "",
  })
  
  const handleChange = (field: keyof Contact, value: any) => {
    onChange({ ...contact, [field]: value })
  }

  const handleAddTag = () => {
    if (tagInput.trim() && (!contact.tags?.includes(tagInput.trim()))) {
      handleChange("tags", [...(contact.tags || []), tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = (contact.tags || []).filter((t) => t !== tagToRemove)
    handleChange("tags", updatedTags)
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white dark:bg-slate-800">
      {/* Header Section - Name, ICE, Type, Status, Tags */}
      <div className="border-b-2 border-slate-300 bg-gradient-to-r from-slate-50 to-white px-6 py-4 dark:border-slate-600 dark:from-slate-700 dark:to-slate-800">
        <div className="space-y-4">
          {/* Name & ICE Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-semibold">
                Nom du Contact
              </Label>
              <Input
                id="name"
                value={contact.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="mt-2 border-2 border-slate-200 bg-white font-medium dark:border-slate-600"
              />
            </div>
            <div>
              <Label htmlFor="ice" className="text-sm font-semibold">
                ICE
              </Label>
              <Input
                id="ice"
                value={contact.ice || ""}
                onChange={(e) => handleChange("ice", e.target.value)}
                placeholder="XX XXX XXX XXX XXX"
                className="mt-2 border-2 border-slate-200 bg-white font-mono dark:border-slate-600"
              />
            </div>
          </div>

          {/* Type & Status Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type" className="text-sm font-semibold">
                Type
              </Label>
              <Select value={contact.type || "customer"} onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger className="mt-2 border-2 border-slate-200 bg-white dark:border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Client</SelectItem>
                  <SelectItem value="supplier">Fournisseur</SelectItem>
                  <SelectItem value="both">Client & Fournisseur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status" className="text-sm font-semibold">
                Statut
              </Label>
              <Select value={contact.status || "prospect"} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger className="mt-2 border-2 border-slate-200 bg-white dark:border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label className="text-sm font-semibold">Étiquettes</Label>
            <div className="mt-2 flex flex-wrap gap-2 rounded-lg border-2 border-slate-200 bg-slate-50 p-3 dark:border-slate-600 dark:bg-slate-700">
              {contact.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer gap-1 border-2 border-blue-300 bg-blue-100 text-blue-900 hover:bg-blue-200 dark:border-blue-600 dark:bg-blue-900 dark:text-blue-100"
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag}
                  <Trash2 className="h-3 w-3" />
                </Badge>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddTag()
                  }
                }}
                placeholder="Ajouter une étiquette..."
                className="border-2 border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-700"
              />
              <Button onClick={handleAddTag} variant="outline" className="border-2 border-slate-200 dark:border-slate-600">
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="general" className="flex h-full flex-col">
          <TabsList className="grid w-full grid-cols-6 gap-3 border-0 bg-slate-50 dark:bg-slate-800 px-4 py-4 rounded-none">
            <TabsTrigger value="general" className="text-xs font-bold md:text-sm px-4 py-2.5 rounded-lg bg-white dark:bg-slate-700 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 data-[state=active]:shadow-lg">
              Général
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-xs font-bold md:text-sm px-4 py-2.5 rounded-lg bg-white dark:bg-slate-700 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 data-[state=active]:shadow-lg">
              Contact
            </TabsTrigger>
            <TabsTrigger value="address" className="text-xs font-bold md:text-sm px-4 py-2.5 rounded-lg bg-white dark:bg-slate-700 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 data-[state=active]:shadow-lg">
              Adresse
            </TabsTrigger>
            <TabsTrigger value="tax" className="text-xs font-bold md:text-sm px-4 py-2.5 rounded-lg bg-white dark:bg-slate-700 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 data-[state=active]:shadow-lg">
              Fiscal
            </TabsTrigger>
            <TabsTrigger value="company" className="text-xs font-bold md:text-sm px-4 py-2.5 rounded-lg bg-white dark:bg-slate-700 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 data-[state=active]:shadow-lg">
              Entreprise
            </TabsTrigger>
            <TabsTrigger value="contacts" className="text-xs font-bold md:text-sm px-4 py-2.5 rounded-lg bg-white dark:bg-slate-700 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 data-[state=active]:shadow-lg">
              Contacts
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="flex-1 overflow-y-auto p-6 min-h-96">
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Classification</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="customerRank" className="text-sm font-medium">
                    Classement Client
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
                          {rank} Étoile{rank !== 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="supplierRank" className="text-sm font-medium">
                    Classement Fournisseur
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
                          {rank} Étoile{rank !== 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="industry" className="text-sm font-medium">
                    Secteur d'Activité
                  </Label>
                  <Input
                    id="industry"
                    value={contact.industry || ""}
                    onChange={(e) => handleChange("industry", e.target.value)}
                    placeholder="Secteur industriel"
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
          className="flex-1 overflow-y-auto p-6 min-h-96"
        >
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Détails de Contact</h3>
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
                    placeholder="email@exemple.ma"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Téléphone
                  </Label>
                  <Input
                    id="phone"
                    value={contact.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+212 (5XX) XXX-XXXX"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <Label htmlFor="mobile" className="text-sm font-medium">
                    Téléphone Mobile
                  </Label>
                  <Input
                    id="mobile"
                    value={contact.mobile || ""}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    placeholder="+212 6XX XXX XXX"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <Label htmlFor="website" className="text-sm font-medium">
                    Site Web
                  </Label>
                  <Input
                    id="website"
                    value={contact.website || ""}
                    onChange={(e) => handleChange("website", e.target.value)}
                    placeholder="https://example.ma"
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
          className="flex-1 overflow-y-auto p-6 min-h-96"
        >
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Informations d'Adresse</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="md:col-span-3">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Adresse
                  </Label>
                  <Input
                    id="address"
                    value={contact.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Adresse complète"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="text-sm font-medium">
                    Ville
                  </Label>
                  <Input
                    id="city"
                    value={contact.city || ""}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="Ville"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <Label htmlFor="quartier" className="text-sm font-medium">
                    Quartier
                  </Label>
                  <Input
                    id="quartier"
                    value={contact.quartier || ""}
                    onChange={(e) => handleChange("quartier", e.target.value)}
                    placeholder="Quartier/Arrondissement"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode" className="text-sm font-medium">
                    Code Postal
                  </Label>
                  <Input
                    id="postalCode"
                    value={contact.postalCode || ""}
                    onChange={(e) => handleChange("postalCode", e.target.value)}
                    placeholder="Code postal"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <Label htmlFor="region" className="text-sm font-medium">
                    Région
                  </Label>
                  <Input
                    id="region"
                    value={contact.region || ""}
                    onChange={(e) => handleChange("region", e.target.value)}
                    placeholder="Région/Wilaya"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <Label htmlFor="country" className="text-sm font-medium">
                    Pays
                  </Label>
                  <Select
                    value={contact.country || "Maroc"}
                    onValueChange={(value) => handleChange("country", value)}
                  >
                    <SelectTrigger className="mt-1 bg-slate-50 dark:bg-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maroc">Maroc</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Belgique">Belgique</SelectItem>
                      <SelectItem value="Suisse">Suisse</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tax & Compliance Tab */}
        <TabsContent
          value="tax"
          className="flex-1 overflow-y-auto p-6 min-h-96"
        >
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Paramètres Fiscaux</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="taxRegime" className="text-sm font-medium">
                    Régime Fiscal
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
                      <SelectItem value="real">Régime Réel</SelectItem>
                      <SelectItem value="simplified">Régime Simplifié</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="vatNumber" className="text-sm font-medium">
                    Numéro TVA
                  </Label>
                  <Input
                    id="vatNumber"
                    value={contact.vatNumber || ""}
                    onChange={(e) => handleChange("vatNumber", e.target.value)}
                    placeholder="Numéro de TVA"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <h3 className="mb-4 text-lg font-semibold">Statut TVA</h3>
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
                    Assujetti à la TVA
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
                    TVA Suspendue
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
                    Provisoire (ICE Non Attribué)
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
                    Activité d'Export
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Company Tab */}
        <TabsContent
          value="company"
          className="flex-1 overflow-y-auto p-6 min-h-96"
        >
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Paramètres Financiers</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="currency" className="text-sm font-medium">
                    Devise
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
                      <SelectItem value="MAD">MAD (Dirham Marocain)</SelectItem>
                      <SelectItem value="USD">USD (Dollar US)</SelectItem>
                      <SelectItem value="EUR">EUR (Euro)</SelectItem>
                      <SelectItem value="GBP">GBP (Livre Sterling)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="paymentTerms" className="text-sm font-medium">
                    Conditions de Paiement
                  </Label>
                  <Select
                    value={contact.paymentTerms || "net30"}
                    onValueChange={(value) =>
                      handleChange("paymentTerms", value)
                    }
                  >
                    <SelectTrigger className="mt-1 bg-slate-50 dark:bg-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immédiat</SelectItem>
                      <SelectItem value="net15">Net 15 jours</SelectItem>
                      <SelectItem value="net30">Net 30 jours</SelectItem>
                      <SelectItem value="net60">Net 60 jours</SelectItem>
                      <SelectItem value="net90">Net 90 jours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="creditLimit" className="text-sm font-medium">
                    Limite de Crédit (MAD)
                  </Label>
                  <Input
                    id="creditLimit"
                    type="number"
                    value={contact.creditLimit || ""}
                    onChange={(e) => handleChange("creditLimit", parseFloat(e.target.value))}
                    placeholder="Montant limite"
                    className="mt-1 bg-slate-50 dark:bg-slate-700"
                  />
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <h3 className="mb-4 text-lg font-semibold">Crédit</h3>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isCreditAllowed"
                  checked={contact.isCreditAllowed || false}
                  onChange={(e) => handleChange("isCreditAllowed", e.target.checked)}
                  className="h-4 w-4 rounded"
                />
                <Label htmlFor="isCreditAllowed" className="text-sm font-medium">
                  Crédit Autorisé
                </Label>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Contacts Tab */}
        <TabsContent
          value="contacts"
          className="flex-1 overflow-y-auto p-6 min-h-96"
        >
          <div className="space-y-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Personnes de Contact</h3>
              <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                Ajoutez les personnes de contact de cette entreprise
              </p>
            </div>

            {/* Contact Lines Table */}
            <div className="overflow-x-auto rounded-lg border-2 border-slate-200 dark:border-slate-600">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-700">
                    <th className="px-4 py-3 text-left text-sm font-semibold">Nom</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Fonction</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Téléphone</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contact.contacts && contact.contacts.length > 0 ? (
                    contact.contacts.map((cont: any, index: number) => (
                      <tr key={index} className="border-b border-slate-200 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-700">
                        {editingRowIndex === index ? (
                          <>
                            <td className="px-4 py-3">
                              <Input
                                value={editValues.name}
                                onChange={(e) =>
                                  setEditValues({ ...editValues, name: e.target.value })
                                }
                                className="h-8"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <Input
                                value={editValues.function}
                                onChange={(e) =>
                                  setEditValues({ ...editValues, function: e.target.value })
                                }
                                className="h-8"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <Input
                                value={editValues.email}
                                type="email"
                                onChange={(e) =>
                                  setEditValues({ ...editValues, email: e.target.value })
                                }
                                className="h-8"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <Input
                                value={editValues.phone}
                                onChange={(e) =>
                                  setEditValues({ ...editValues, phone: e.target.value })
                                }
                                className="h-8"
                              />
                            </td>
                            <td className="px-4 py-3 text-center flex items-center justify-center gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  const updatedContacts = [...(contact.contacts || [])]
                                  updatedContacts[index] = {
                                    ...updatedContacts[index],
                                    name: editValues.name,
                                    function: editValues.function,
                                    email: editValues.email,
                                    phone: editValues.phone,
                                  }
                                  handleChange("contacts", updatedContacts)
                                  setEditingRowIndex(null)
                                }}
                                className="h-8 w-8 p-0"
                              >
                                <Check className="h-4 w-4 text-green-500" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingRowIndex(null)}
                                className="h-8 w-8 p-0"
                              >
                                <X className="h-4 w-4 text-slate-400" />
                              </Button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-4 py-3 text-sm">{cont.name || "-"}</td>
                            <td className="px-4 py-3 text-sm">{cont.function || "-"}</td>
                            <td className="px-4 py-3 text-sm">{cont.email || "-"}</td>
                            <td className="px-4 py-3 text-sm">{cont.phone || "-"}</td>
                            <td className="px-4 py-3 text-center flex items-center justify-center gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setEditingRowIndex(index)
                                  setEditValues({
                                    name: cont.name || "",
                                    function: cont.function || "",
                                    email: cont.email || "",
                                    phone: cont.phone || "",
                                  })
                                }}
                                className="h-8 w-8 p-0"
                                title="Edit row"
                              >
                                <Edit2 className="h-4 w-4 text-blue-500" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  const updatedContacts = [...(contact.contacts || [])]
                                  updatedContacts.splice(index, 1)
                                  handleChange("contacts", updatedContacts)
                                }}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-500">
                        Aucune personne de contact ajoutée
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* Add Row Button in Table Footer */}
              <div className="border-t-2 border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-600 dark:bg-slate-700">
                <Button
                  size="sm"
                  className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    const updatedContacts = [...(contact.contacts || []), { name: "", function: "", email: "", phone: "" }]
                    handleChange("contacts", updatedContacts)
                    // Auto-open edit mode for the new row
                    setEditingRowIndex(updatedContacts.length - 1)
                    setEditValues({ name: "", function: "", email: "", phone: "" })
                  }}
                >
                  <Plus className="h-4 w-4" />
                  Ajouter une Personne de Contact
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>

      {/* Footer with Action Buttons */}
      <div className="border-t-2 border-slate-300 bg-gradient-to-r from-slate-100 to-slate-50 px-6 py-4 dark:border-slate-600 dark:from-slate-700 dark:to-slate-800">
        <div className="flex justify-end gap-3">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-2 border-slate-300 hover:bg-slate-100 dark:border-slate-500 dark:hover:bg-slate-700"
            >
              Annuler
            </Button>
          )}
          {onSave && (
            <Button
              type="button"
              onClick={onSave}
              className="border-2 border-blue-500 bg-blue-600 font-semibold hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              <Save className="mr-2 h-4 w-4" />
              Enregistrer
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
