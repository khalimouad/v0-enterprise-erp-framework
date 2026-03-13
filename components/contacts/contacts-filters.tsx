"use client"

import * as React from "react"
import { X, Search, Plus, Trash2, ChevronDown } from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ContactsFiltersProps {
  isOpen: boolean
  onClose: () => void
}

type FilterType = 
  | "name" 
  | "email" 
  | "phone" 
  | "type" 
  | "status" 
  | "country" 
  | "city" 
  | "industry" 
  | "paymentTerms" 
  | "currency" 
  | "creationDate" 
  | "modificationDate" 
  | "createdBy" 
  | "contacts"

export function ContactsFilters({ isOpen, onClose }: ContactsFiltersProps) {
  const [aiFilter, setAiFilter] = React.useState("")
  const [activeFilters, setActiveFilters] = React.useState<FilterType[]>([])
  
  // Quick filter fields
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [type, setType] = React.useState("")
  const [status, setStatus] = React.useState("")
  const [country, setCountry] = React.useState("")
  const [city, setCity] = React.useState("")
  const [industry, setIndustry] = React.useState("")
  const [paymentTerms, setPaymentTerms] = React.useState("")
  const [currency, setCurrency] = React.useState("")
  
  // Date range filters
  const [creationDateFrom, setCreationDateFrom] = React.useState("")
  const [creationDateTo, setCreationDateTo] = React.useState("")
  const [modificationDateFrom, setModificationDateFrom] = React.useState("")
  const [modificationDateTo, setModificationDateTo] = React.useState("")
  
  // Special filters
  const [createdBy, setCreatedBy] = React.useState("")
  const [hasContacts, setHasContacts] = React.useState("")

  const availableFilters: Array<{ id: FilterType; label: string }> = [
    { id: "name", label: "Nom" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Téléphone" },
    { id: "type", label: "Type" },
    { id: "status", label: "Statut" },
    { id: "country", label: "Pays" },
    { id: "city", label: "Ville" },
    { id: "industry", label: "Secteur" },
    { id: "paymentTerms", label: "Conditions de Paiement" },
    { id: "currency", label: "Devise" },
    { id: "creationDate", label: "Date de Création" },
    { id: "modificationDate", label: "Date de Modification" },
    { id: "createdBy", label: "Créé par" },
    { id: "contacts", label: "Personnes de Contact" },
  ]

  const addFilter = (filterId: FilterType) => {
    if (!activeFilters.includes(filterId)) {
      setActiveFilters([...activeFilters, filterId])
    }
  }

  const removeFilter = (filterId: FilterType) => {
    setActiveFilters(activeFilters.filter((f) => f !== filterId))
  }

  const renderFilter = (filterId: FilterType) => {
    switch (filterId) {
      case "name":
        return (
          <div key={filterId} className="space-y-2 rounded-lg border-2 border-slate-200 p-3 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Nom</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeFilter(filterId)}
                className="h-6 w-6 p-0"
              >
                <Trash2 className="h-3 w-3 text-red-500" />
              </Button>
            </div>
            <Input
              placeholder="Chercher par nom..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-slate-200 dark:border-slate-600"
            />
          </div>
        )

      case "email":
        return (
          <div key={filterId} className="space-y-2 rounded-lg border-2 border-slate-200 p-3 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Email</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeFilter(filterId)}
                className="h-6 w-6 p-0"
              >
                <Trash2 className="h-3 w-3 text-red-500" />
              </Button>
            </div>
            <Input
              type="email"
              placeholder="Chercher par email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-slate-200 dark:border-slate-600"
            />
          </div>
        )

      case "phone":
        return (
          <div key={filterId} className="space-y-2 rounded-lg border-2 border-slate-200 p-3 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Téléphone</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeFilter(filterId)}
                className="h-6 w-6 p-0"
              >
                <Trash2 className="h-3 w-3 text-red-500" />
              </Button>
            </div>
            <Input
              placeholder="Chercher par téléphone..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-2 border-slate-200 dark:border-slate-600"
            />
          </div>
        )

      case "type":
        return (
          <div key={filterId} className="space-y-2 rounded-lg border-2 border-slate-200 p-3 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Type</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeFilter(filterId)}
                className="h-6 w-6 p-0"
              >
                <Trash2 className="h-3 w-3 text-red-500" />
              </Button>
            </div>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="border-2 border-slate-200 dark:border-slate-600">
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Client</SelectItem>
                <SelectItem value="supplier">Fournisseur</SelectItem>
                <SelectItem value="both">Client & Fournisseur</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )

      case "status":
        return (
          <div key={filterId} className="space-y-2 rounded-lg border-2 border-slate-200 p-3 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Statut</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeFilter(filterId)}
                className="h-6 w-6 p-0"
              >
                <Trash2 className="h-3 w-3 text-red-500" />
              </Button>
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="border-2 border-slate-200 dark:border-slate-600">
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="inactive">Inactif</SelectItem>
                <SelectItem value="prospect">Prospect</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )

      case "country":
        return (
          <div key={filterId} className="space-y-2 rounded-lg border-2 border-slate-200 p-3 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Pays</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeFilter(filterId)}
                className="h-6 w-6 p-0"
              >
                <Trash2 className="h-3 w-3 text-red-500" />
              </Button>
            </div>
            <Input
              placeholder="Chercher par pays..."
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border-2 border-slate-200 dark:border-slate-600"
            />
          </div>
        )

      case "city":
        return (
          <div key={filterId} className="space-y-2 rounded-lg border-2 border-slate-200 p-3 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Ville</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeFilter(filterId)}
                className="h-6 w-6 p-0"
              >
                <Trash2 className="h-3 w-3 text-red-500" />
              </Button>
            </div>
            <Input
              placeholder="Chercher par ville..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border-2 border-slate-200 dark:border-slate-600"
            />
          </div>
        )

      case "industry":
        return (
          <div key={filterId} className="space-y-2 rounded-lg border-2 border-slate-200 p-3 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Secteur</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeFilter(filterId)}
                className="h-6 w-6 p-0"
              >
                <Trash2 className="h-3 w-3 text-red-500" />
              </Button>
            </div>
            <Input
              placeholder="Chercher par secteur..."
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="border-2 border-slate-200 dark:border-slate-600"
            />
          </div>
        )

      case "paymentTerms":
        return (
          <div key={filterId} className="space-y-2 rounded-lg border-2 border-slate-200 p-3 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Conditions de Paiement</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeFilter(filterId)}
                className="h-6 w-6 p-0"
              >
                <Trash2 className="h-3 w-3 text-red-500" />
              </Button>
            </div>
            <Select value={paymentTerms} onValueChange={setPaymentTerms}>
              <SelectTrigger className="border-2 border-slate-200 dark:border-slate-600">
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immédiat</SelectItem>
                <SelectItem value="net15">Net 15 Jours</SelectItem>
                <SelectItem value="net30">Net 30 Jours</SelectItem>
                <SelectItem value="net45">Net 45 Jours</SelectItem>
                <SelectItem value="net60">Net 60 Jours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )

      case "currency":
        return (
          <div key={filterId} className="space-y-2 rounded-lg border-2 border-slate-200 p-3 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Devise</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeFilter(filterId)}
                className="h-6 w-6 p-0"
              >
                <Trash2 className="h-3 w-3 text-red-500" />
              </Button>
            </div>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="border-2 border-slate-200 dark:border-slate-600">
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="gbp">GBP</SelectItem>
                <SelectItem value="cad">CAD</SelectItem>
                <SelectItem value="cny">CNY</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )

      case "creationDate":
        return (
          <div key={filterId} className="space-y-2 rounded-lg border-2 border-slate-200 p-3 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Date de Création</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeFilter(filterId)}
                className="h-6 w-6 p-0"
              >
                <Trash2 className="h-3 w-3 text-red-500" />
              </Button>
            </div>
            <Input
              type="date"
              value={creationDateFrom}
              onChange={(e) => setCreationDateFrom(e.target.value)}
              placeholder="Du"
              className="border-2 border-slate-200 dark:border-slate-600"
            />
            <Input
              type="date"
              value={creationDateTo}
              onChange={(e) => setCreationDateTo(e.target.value)}
              placeholder="Au"
              className="border-2 border-slate-200 dark:border-slate-600"
            />
          </div>
        )

      case "modificationDate":
        return (
          <div key={filterId} className="space-y-2 rounded-lg border-2 border-slate-200 p-3 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Date de Modification</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeFilter(filterId)}
                className="h-6 w-6 p-0"
              >
                <Trash2 className="h-3 w-3 text-red-500" />
              </Button>
            </div>
            <Input
              type="date"
              value={modificationDateFrom}
              onChange={(e) => setModificationDateFrom(e.target.value)}
              placeholder="Du"
              className="border-2 border-slate-200 dark:border-slate-600"
            />
            <Input
              type="date"
              value={modificationDateTo}
              onChange={(e) => setModificationDateTo(e.target.value)}
              placeholder="Au"
              className="border-2 border-slate-200 dark:border-slate-600"
            />
          </div>
        )

      case "createdBy":
        return (
          <div key={filterId} className="space-y-2 rounded-lg border-2 border-slate-200 p-3 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Créé par</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeFilter(filterId)}
                className="h-6 w-6 p-0"
              >
                <Trash2 className="h-3 w-3 text-red-500" />
              </Button>
            </div>
            <Select value={createdBy} onValueChange={setCreatedBy}>
              <SelectTrigger className="border-2 border-slate-200 dark:border-slate-600">
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )

      case "contacts":
        return (
          <div key={filterId} className="space-y-2 rounded-lg border-2 border-slate-200 p-3 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Personnes de Contact</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeFilter(filterId)}
                className="h-6 w-6 p-0"
              >
                <Trash2 className="h-3 w-3 text-red-500" />
              </Button>
            </div>
            <Select value={hasContacts} onValueChange={setHasContacts}>
              <SelectTrigger className="border-2 border-slate-200 dark:border-slate-600">
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="with">Avec contacts</SelectItem>
                <SelectItem value="without">Sans contacts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 dark:bg-black/50"
          onClick={onClose}
        />
      )}

      {/* Filters Panel */}
      <div
        className={`fixed left-0 top-0 z-40 h-screen w-80 border-r-2 border-slate-300 bg-white shadow-lg transition-transform duration-300 ease-in-out dark:border-slate-700 dark:bg-slate-900 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="border-b-2 border-slate-300 bg-gradient-to-r from-slate-50 to-white px-6 py-4 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filtres</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters Content */}
        <div className="overflow-y-auto p-6" style={{ height: "calc(100vh - 140px)" }}>
          <div className="space-y-4">
            {/* AI Filter - Always Visible */}
            <div className="space-y-2 rounded-lg border-2 border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-900">
              <Label className="font-semibold text-blue-900 dark:text-blue-100">
                Filtre IA
              </Label>
              <Input
                placeholder="Décrivez ce que vous recherchez..."
                value={aiFilter}
                onChange={(e) => setAiFilter(e.target.value)}
                className="border-2 border-blue-300 bg-white dark:border-blue-600 dark:bg-slate-800"
              />
              <p className="text-xs text-blue-800 dark:text-blue-200">
                Utilisez le langage naturel pour filtrer vos contacts
              </p>
            </div>

            {/* Dynamic Filters */}
            {activeFilters.length > 0 && (
              <div className="space-y-3">
                {activeFilters.map((filterId) => renderFilter(filterId))}
              </div>
            )}

            {/* Add Filter Button */}
            {activeFilters.length < availableFilters.length && (
              <div className="pt-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 border-2 border-dashed border-slate-300 dark:border-slate-600"
                    >
                      <Plus className="h-4 w-4" />
                      Ajouter un filtre
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {availableFilters
                      .filter((f) => !activeFilters.includes(f.id))
                      .map((filter) => (
                        <DropdownMenuItem
                          key={filter.id}
                          onClick={() => addFilter(filter.id)}
                        >
                          {filter.label}
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="border-t-2 border-slate-300 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 border-2"
              onClick={() => {
                setName("")
                setEmail("")
                setPhone("")
                setType("")
                setStatus("")
                setCountry("")
                setCity("")
                setIndustry("")
                setPaymentTerms("")
                setCurrency("")
                setCreationDateFrom("")
                setCreationDateTo("")
                setModificationDateFrom("")
                setModificationDateTo("")
                setCreatedBy("")
                setHasContacts("")
                setAiFilter("")
                setActiveFilters([])
              }}
            >
              Réinitialiser
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              Appliquer
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
