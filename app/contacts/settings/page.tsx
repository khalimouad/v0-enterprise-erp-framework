"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Settings, MapPin, Briefcase, Globe, Building2, Tag } from "lucide-react"
import Link from "next/link"

export default function ContactsSettingsPage() {
  const configSections = [
    {
      id: "regions",
      title: "Régions",
      description: "Gérez les régions disponibles",
      icon: MapPin,
      color: "emerald",
      href: "/contacts/settings/regions",
    },
    {
      id: "cities",
      title: "Villes",
      description: "Gérez les villes disponibles",
      icon: Building2,
      color: "blue",
      href: "/contacts/settings/cities",
    },
    {
      id: "countries",
      title: "Pays",
      description: "Gérez les pays disponibles",
      icon: Globe,
      color: "purple",
      href: "/contacts/settings/countries",
    },
    {
      id: "industries",
      title: "Secteurs d'Activité",
      description: "Gérez les secteurs industriels",
      icon: Briefcase,
      color: "orange",
      href: "/contacts/settings/industries",
    },
    {
      id: "statuses",
      title: "Statuts",
      description: "Gérez les statuts de contact",
      icon: Tag,
      color: "rose",
      href: "/contacts/settings/statuses",
    },
  ]

  const colorClasses = {
    emerald: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600",
    blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600",
    purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600",
    orange: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600",
    rose: "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 hover:border-rose-400 dark:hover:border-rose-600",
  }

  const iconColorClasses = {
    emerald: "text-emerald-600 dark:text-emerald-400",
    blue: "text-blue-600 dark:text-blue-400",
    purple: "text-purple-600 dark:text-purple-400",
    orange: "text-orange-600 dark:text-orange-400",
    rose: "text-rose-600 dark:text-rose-400",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link href="/contacts">
            <Button variant="ghost" size="sm" className="gap-2 mb-4">
              ← Retour aux Contacts
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl">
                <Settings className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              Configuration des Contacts
            </h1>
            <p className="text-muted-foreground mt-3 text-lg">
              Gérez les listes déroulantes utilisées dans les formulaires de contact
            </p>
          </div>
        </div>

        {/* Configuration Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {configSections.map((section) => {
            const Icon = section.icon
            const colorClass = colorClasses[section.color as keyof typeof colorClasses]
            const iconColorClass = iconColorClasses[section.color as keyof typeof iconColorClasses]

            return (
              <Link key={section.id} href={section.href}>
                <Card className={`border-2 transition-all cursor-pointer h-full ${colorClass}`}>
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${section.color === "emerald" ? "bg-emerald-100 dark:bg-emerald-800" : section.color === "blue" ? "bg-blue-100 dark:bg-blue-800" : section.color === "purple" ? "bg-purple-100 dark:bg-purple-800" : section.color === "orange" ? "bg-orange-100 dark:bg-orange-800" : "bg-rose-100 dark:bg-rose-800"}`}>
                        <Icon className={`h-6 w-6 ${iconColorClass}`} />
                      </div>
                      <ArrowRight className={`h-5 w-5 ${iconColorClass} transition-transform group-hover:translate-x-1`} />
                    </div>
                    <h2 className="text-lg font-bold text-foreground mb-1">{section.title}</h2>
                    <p className="text-sm text-muted-foreground flex-grow">{section.description}</p>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Information Card */}
        <Card className="border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900">
          <div className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-3">💡 À Propos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">✓</span>
                <span>Cliquez sur chaque section pour gérer ses éléments dans une vue détaillée</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">✓</span>
                <span>Les modifications sont automatiquement synchronisées avec les formulaires</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">✓</span>
                <span>Les configurations sont stockées localement dans votre navigateur</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}
