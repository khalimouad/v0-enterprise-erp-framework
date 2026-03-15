"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { getContactConfig, saveContactConfig, type ContactConfig } from "@/lib/contact-config"
import { ArrowLeft, Plus, Trash2, Edit2, Check, X } from "lucide-react"
import Link from "next/link"

interface ConfigSubPageProps {
  title: string
  description: string
  configKey: keyof Omit<ContactConfig, "customFields">
  backHref?: string
}

export function ConfigSubPage({ title, description, configKey, backHref = "/contacts/settings" }: ConfigSubPageProps) {
  const [config, setConfig] = React.useState<ContactConfig | null>(null)
  const [items, setItems] = React.useState<string[]>([])
  const [newItem, setNewItem] = React.useState("")
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null)
  const [editValue, setEditValue] = React.useState("")
  const [isSaved, setIsSaved] = React.useState(false)

  React.useEffect(() => {
    const loadConfig = () => {
      const loaded = getContactConfig()
      setConfig(loaded)
      setItems(loaded[configKey] as string[])
    }
    loadConfig()
  }, [configKey])

  const handleAddItem = () => {
    if (newItem.trim() && !items.includes(newItem.trim())) {
      const updated = [...items, newItem.trim()]
      setItems(updated)
      setNewItem("")
      saveChanges(updated)
    }
  }

  const handleDeleteItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index)
    setItems(updated)
    saveChanges(updated)
  }

  const handleEditStart = (index: number) => {
    setEditingIndex(index)
    setEditValue(items[index])
  }

  const handleEditSave = (index: number) => {
    if (editValue.trim() && !items.includes(editValue.trim())) {
      const updated = [...items]
      updated[index] = editValue.trim()
      setItems(updated)
      saveChanges(updated)
    }
    setEditingIndex(null)
    setEditValue("")
  }

  const saveChanges = (updatedItems: string[]) => {
    if (config) {
      const updated = { ...config, [configKey]: updatedItems }
      saveContactConfig(updated)
      setConfig(updated)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    }
  }

  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <Link href={backHref}>
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour à la Configuration
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground mt-2">{description}</p>
          </div>
        </div>

        {/* Save Status */}
        {isSaved && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-in">
            Configuration enregistrée ✓
          </div>
        )}

        {/* Add New Item */}
        <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Ajouter un nouvel élément</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Entrez le nouvel élément..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
              className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
            />
            <Button
              onClick={handleAddItem}
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
            >
              <Plus className="h-4 w-4" />
              Ajouter
            </Button>
          </div>
        </Card>

        {/* Items Table */}
        <Card className="border-2 border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 border-b-2 border-slate-200 dark:border-slate-600">
                  <th className="px-6 py-4 text-left text-sm font-bold text-foreground">#</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Élément</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-100 dark:divide-slate-700">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                      Aucun élément ajouté. Commencez par en ajouter un.
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-muted-foreground w-12">{index + 1}</td>
                      <td className="px-6 py-4">
                        {editingIndex === index ? (
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                            autoFocus
                          />
                        ) : (
                          <span className="text-foreground font-medium">{item}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex gap-2 justify-center">
                          {editingIndex === index ? (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-green-50 dark:hover:bg-green-900/20"
                                onClick={() => handleEditSave(index)}
                              >
                                <Check className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-red-50 dark:hover:bg-red-900/20"
                                onClick={() => setEditingIndex(null)}
                              >
                                <X className="h-4 w-4 text-red-600" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                onClick={() => handleEditStart(index)}
                              >
                                <Edit2 className="h-4 w-4 text-blue-600" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-red-50 dark:hover:bg-red-900/20"
                                onClick={() => handleDeleteItem(index)}
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {items.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900 px-6 py-3 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-muted-foreground">
                Total: <span className="font-bold text-foreground">{items.length}</span> élément{items.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
