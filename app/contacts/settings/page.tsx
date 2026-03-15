"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getContactConfig, saveContactConfig, type ContactConfig } from "@/lib/contact-config"
import { ConfigList } from "@/components/contacts/config-list"
import { ArrowLeft, RotateCcw, Settings } from "lucide-react"
import Link from "next/link"

export default function ContactsSettingsPage() {
  const [config, setConfig] = React.useState<ContactConfig | null>(null)
  const [isSaved, setIsSaved] = React.useState(false)

  React.useEffect(() => {
    const loadConfig = () => {
      const loaded = getContactConfig()
      setConfig(loaded)
    }
    loadConfig()
  }, [])

  const handleConfigChange = (key: keyof Omit<ContactConfig, "customFields">, value: string[]) => {
    if (config) {
      const updated = { ...config, [key]: value }
      setConfig(updated)
      setIsSaved(false)
    }
  }

  const handleSaveAll = () => {
    if (config) {
      saveContactConfig(config)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    }
  }

  const handleReset = () => {
    if (window.confirm("Êtes-vous sûr de vouloir réinitialiser toute la configuration ?")) {
      localStorage.removeItem("contact_config")
      const fresh = getContactConfig()
      setConfig(fresh)
    }
  }

  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <Settings className="h-8 w-8 text-blue-600" />
          </div>
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link href="/contacts">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour aux Contacts
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              Configuration des Contacts
            </h1>
            <p className="text-muted-foreground mt-2">
              Gérez les listes déroulantes et les champs personnalisés pour les contacts
            </p>
          </div>
        </div>

        {/* Save Status */}
        {isSaved && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-in">
            Configuration enregistrée avec succès ✓
          </div>
        )}

        {/* Configuration Sections */}
        <div className="space-y-8">
          {/* Location Settings */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              Paramètres de Localisation
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <ConfigList
                title="Régions"
                description="Gérez les régions disponibles"
                items={config.regions}
                category="regions"
                icon="🗺️"
                onItemsChange={(items) => handleConfigChange("regions", items)}
              />
              <ConfigList
                title="Villes"
                description="Gérez les villes disponibles"
                items={config.cities}
                category="cities"
                icon="🏙️"
                onItemsChange={(items) => handleConfigChange("cities", items)}
              />
              <ConfigList
                title="Pays"
                description="Gérez les pays disponibles"
                items={config.countries}
                category="countries"
                icon="🌍"
                onItemsChange={(items) => handleConfigChange("countries", items)}
              />
            </div>
          </div>

          {/* Business Settings */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              Paramètres Commerciaux
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <ConfigList
                title="Secteurs d'Activité"
                description="Gérez les secteurs industriels"
                items={config.industries}
                category="industries"
                icon="💼"
                onItemsChange={(items) => handleConfigChange("industries", items)}
              />
              <ConfigList
                title="Statuts"
                description="Gérez les statuts de contact"
                items={config.statuses}
                category="statuses"
                icon="📊"
                onItemsChange={(items) => handleConfigChange("statuses", items)}
              />
            </div>
          </div>

          {/* Information Section */}
          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-base">À Propos de la Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Les modifications sont automatiquement synchronisées avec les formulaires de contact</li>
                <li>✓ Vous pouvez ajouter, modifier ou supprimer des éléments à tout moment</li>
                <li>✓ Les configurations sont stockées localement dans votre navigateur</li>
                <li>✓ Cliquez sur le bouton "Réinitialiser" pour restaurer les valeurs par défaut</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            onClick={handleReset}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Réinitialiser les Valeurs par Défaut
          </Button>
          <Button
            onClick={handleSaveAll}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Settings className="h-4 w-4" />
            Enregistrer la Configuration
          </Button>
        </div>
      </div>
    </div>
  )
}
