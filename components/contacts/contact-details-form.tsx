"use client"

import * as React from "react"
import { Trash2 } from "lucide-react"
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

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = (contact.tags || []).filter((t) => t !== tagToRemove)
    handleChange("tags", updatedTags)
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white dark:bg-slate-900">
      {/* Header Section - Name, ICE, Type, Tags */}
      <div className="border-b border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800">
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Nom du Contact
            </Label>
            <Input
              id="name"
              value={contact.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Entrez le nom du contact"
              className="mt-1 bg-white dark:bg-slate-700"
            />
          </div>

          {/* ICE, Type, Status - 3 columns on desktop, stack on mobile */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="ice" className="text-sm font-medium">
                Numéro ICE
              </Label>
              <Input
                id="ice"
                value={contact.ice || ""}
                onChange={(e) => handleChange("ice", e.target.value)}
                placeholder="Identifiant Client d'Entreprise"
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
                  <SelectItem value="customer">Client</SelectItem>
                  <SelectItem value="supplier">Fournisseur</SelectItem>
                  <SelectItem value="both">Client & Fournisseur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status" className="text-sm font-medium">
                Statut
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
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                  <SelectItem value="prospect">Prospect</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags" className="text-sm font-medium">
              Étiquettes
            </Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {contact.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-2 pr-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded hover:bg-slate-300 dark:hover:bg-slate-600"
                    aria-label={`Supprimer l'étiquette ${tag}`}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
                placeholder="Ajouter une étiquette et appuyer sur Entrée"
                className="bg-white dark:bg-slate-700"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddTag}
              >
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area with Tabs */}
      <Tabs defaultValue="general" className="flex flex-1 flex-col overflow-hidden">
        <TabsList className="border-b bg-slate-50 dark:bg-slate-800">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="contact">Coordonnées</TabsTrigger>
          <TabsTrigger value="address">Adresse</TabsTrigger>
          <TabsTrigger value="tax">Fiscal</TabsTrigger>
          <TabsTrigger value="company">Entreprise</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent
          value="general"
          className="flex-1 overflow-y-auto p-6"
        >
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
          className="flex-1 overflow-y-auto p-6"
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
          className="flex-1 overflow-y-auto p-6"
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
          className="flex-1 overflow-y-auto p-6"
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
          className="flex-1 overflow-y-auto p-6"
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
      </Tabs>

      {/* Footer with Action Buttons */}
      <div className="border-t border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800">
        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Annuler
            </Button>
          )}
          {onSave && (
            <Button
              type="button"
              onClick={onSave}
              className="bg-blue-600 hover:bg-blue-700"
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
