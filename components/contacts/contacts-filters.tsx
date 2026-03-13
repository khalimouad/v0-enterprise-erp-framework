"use client"

import * as React from "react"
import { X, Plus, Trash2 } from "lucide-react"
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
  | "domain"
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
  
  // Filter values
  const [filterValues, setFilterValues] = React.useState<Record<string, string>>({})

  const availableFilters: Array<{ id: FilterType; label: string; type: "text" | "select" | "date" }> = [
    { id: "name", label: "Nom", type: "text" },
    { id: "email", label: "Email", type: "text" },
    { id: "phone", label: "Téléphone", type: "text" },
    { id: "type", label: "Type", type: "select" },
    { id: "status", label: "Statut", type: "select" },
    { id: "country", label: "Pays", type: "text" },
    { id: "city", label: "Ville", type: "text" },
    { id: "domain", label: "Domaine", type: "text" },
    { id: "industry", label: "Secteur", type: "text" },
    { id: "paymentTerms", label: "Conditions de Paiement", type: "select" },
    { id: "currency", label: "Devise", type: "select" },
    { id: "creationDate", label: "Date de Création", type: "date" },
    { id: "modificationDate", label: "Date de Modification", type: "date" },
    { id: "createdBy", label: "Créé par", type: "select" },
    { id: "contacts", label: "Personnes de Contact", type: "select" },
  ]

  const selectOptions: Record<string, Array<{ value: string; label: string }>> = {
    type: [
      { value: "customer", label: "Client" },
      { value: "supplier", label: "Fournisseur" },
      { value: "both", label: "Client & Fournisseur" },
    ],
    status: [
      { value: "active", label: "Actif" },
      { value: "inactive", label: "Inactif" },
      { value: "prospect", label: "Prospect" },
    ],
    paymentTerms: [
      { value: "immediate", label: "Immédiat" },
      { value: "net15", label: "Net 15 jours" },
      { value: "net30", label: "Net 30 jours" },
      { value: "net45", label: "Net 45 jours" },
      { value: "net60", label: "Net 60 jours" },
    ],
    currency: [
      { value: "usd", label: "USD" },
      { value: "eur", label: "EUR" },
      { value: "gbp", label: "GBP" },
      { value: "cad", label: "CAD" },
      { value: "cny", label: "CNY" },
    ],
    createdBy: [
      { value: "admin", label: "Admin" },
      { value: "commercial", label: "Commercial" },
      { value: "support", label: "Support" },
    ],
    contacts: [
      { value: "with", label: "Avec des personnes" },
      { value: "without", label: "Sans personnes" },
      { value: "any", label: "Tous" },
    ],
  }

  const addFilter = (filterId: FilterType) => {
    if (!activeFilters.includes(filterId)) {
      setActiveFilters([...activeFilters, filterId])
    }
  }

  const removeFilter = (filterId: FilterType) => {
    setActiveFilters(activeFilters.filter((f) => f !== filterId))
    const newValues = { ...filterValues }
    delete newValues[filterId]
    setFilterValues(newValues)
  }

  const updateFilterValue = (filterId: FilterType, value: string) => {
    setFilterValues({ ...filterValues, [filterId]: value })
  }

  const renderFilterInput = (filter: { id: FilterType; label: string; type: "text" | "select" | "date" }) => {
    const value = filterValues[filter.id] || ""

    if (filter.type === "select") {
      const options = selectOptions[filter.id] || []
      return (
        <Select value={value} onValueChange={(v) => updateFilterValue(filter.id, v)}>
          <SelectTrigger className="h-9">
            <SelectValue placeholder={`Sélectionner ${filter.label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    }

    if (filter.type === "date") {
      return (
        <Input
          type="date"
          value={value}
          onChange={(e) => updateFilterValue(filter.id, e.target.value)}
          className="h-9"
        />
      )
    }

    return (
      <Input
        placeholder={`Filtrer par ${filter.label.toLowerCase()}`}
        value={value}
        onChange={(e) => updateFilterValue(filter.id, e.target.value)}
        className="h-9"
      />
    )
  }

  const resetFilters = () => {
    setActiveFilters([])
    setFilterValues({})
    setAiFilter("")
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Filters Panel */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-card border-r border-border shadow-lg z-50 transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-lg">Filtres</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* AI Filter - Always Visible */}
          <div className="space-y-2">
            <Label className="font-semibold text-sm">Filtre IA</Label>
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <Input
                placeholder="Décrivez ce que vous cherchez..."
                value={aiFilter}
                onChange={(e) => setAiFilter(e.target.value)}
                className="bg-white dark:bg-slate-900 border-0 h-9"
              />
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                Exemples: clients actifs en France, fournisseurs depuis 2023
              </p>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="space-y-3 bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
              {activeFilters.map((filterId) => {
                const filter = availableFilters.find((f) => f.id === filterId)
                if (!filter) return null
                return (
                  <div key={filterId} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium">{filter.label}</Label>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeFilter(filterId)}
                      >
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                    {renderFilterInput(filter)}
                  </div>
                )
              })}
            </div>
          )}

          {/* Add Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-full gap-2">
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

        {/* Footer Actions */}
        <div className="p-4 border-t border-border flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={resetFilters}
          >
            Réinitialiser
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={onClose}
          >
            Appliquer
          </Button>
        </div>
      </div>
    </>
  )
}
