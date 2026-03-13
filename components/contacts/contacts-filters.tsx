"use client"

import * as React from "react"
import { X, Search } from "lucide-react"
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

interface ContactsFiltersProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactsFilters({ isOpen, onClose }: ContactsFiltersProps) {
  const [creationDateFrom, setCreationDateFrom] = React.useState("")
  const [creationDateTo, setCreationDateTo] = React.useState("")
  const [modificationDateFrom, setModificationDateFrom] = React.useState("")
  const [modificationDateTo, setModificationDateTo] = React.useState("")
  const [createdBy, setCreatedBy] = React.useState("")
  const [hasContacts, setHasContacts] = React.useState("")
  const [aiFilter, setAiFilter] = React.useState("")

  const handleReset = () => {
    setCreationDateFrom("")
    setCreationDateTo("")
    setModificationDateFrom("")
    setModificationDateTo("")
    setCreatedBy("")
    setHasContacts("")
    setAiFilter("")
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
          <div className="space-y-6">
            {/* Creation Date */}
            <div className="space-y-2">
              <Label className="font-semibold">Date de Création</Label>
              <div className="space-y-2">
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
            </div>

            {/* Last Modification Date */}
            <div className="space-y-2">
              <Label className="font-semibold">Date de Dernière Modification</Label>
              <div className="space-y-2">
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
            </div>

            {/* Created By */}
            <div className="space-y-2">
              <Label htmlFor="createdBy" className="font-semibold">
                Créé par
              </Label>
              <Select value={createdBy} onValueChange={setCreatedBy}>
                <SelectTrigger className="border-2 border-slate-200 dark:border-slate-600">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="sales">Commercial</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Number of Contacts */}
            <div className="space-y-2">
              <Label htmlFor="hasContacts" className="font-semibold">
                Personnes de Contact
              </Label>
              <Select value={hasContacts} onValueChange={setHasContacts}>
                <SelectTrigger className="border-2 border-slate-200 dark:border-slate-600">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="with">Avec contacts</SelectItem>
                  <SelectItem value="without">Sans contacts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* AI Filter */}
            <div className="space-y-2">
              <Label htmlFor="aiFilter" className="font-semibold">
                Filtre IA
              </Label>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Décrivez ce que vous cherchez et l'IA filtrera les contacts
              </p>
              <div className="relative">
                <Input
                  id="aiFilter"
                  value={aiFilter}
                  onChange={(e) => setAiFilter(e.target.value)}
                  placeholder="Ex: Clients de France avec plus de 5 contacts..."
                  className="border-2 border-slate-200 pl-10 dark:border-slate-600"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t-2 border-slate-300 bg-gradient-to-r from-slate-50 to-white px-6 py-3 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 border-2 border-slate-300 dark:border-slate-600"
              onClick={handleReset}
            >
              Réinitialiser
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => console.log("[v0] Apply filters", {
                creationDateFrom,
                creationDateTo,
                modificationDateFrom,
                modificationDateTo,
                createdBy,
                hasContacts,
                aiFilter,
              })}
            >
              Appliquer
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
