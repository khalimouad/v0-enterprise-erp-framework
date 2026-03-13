"use client"

import * as React from "react"
import { Lightbulb, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { Contact } from "@/lib/types"

interface ContactAISuggestionsProps {
  contact: Contact
}

export function ContactAISuggestions({ contact }: ContactAISuggestionsProps) {
  const [suggestions, setSuggestions] = React.useState<string[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    generateSuggestions()
  }, [contact.id])

  const generateSuggestions = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/chat/ollama", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Pour le contact ${contact.name}, fournis 3 suggestions brèves et pratiques (50 mots max chacune):
1. Action recommandée
2. Information à vérifier
3. Opportunité d'affaire

Sois concis et actionnable.`,
          context: {
            contactName: contact.name,
            type: contact.type,
            status: contact.status,
            tags: contact.tags,
          },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const parsed = data.response
          .split("\n")
          .filter((line: string) => line.trim() && line.includes("."))
          .slice(0, 3)
        setSuggestions(parsed)
      }
    } catch {
      console.error("[v0] Erreur génération suggestions")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-lg border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 p-4 dark:border-amber-700 dark:from-amber-900 dark:to-yellow-900">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <h3 className="font-semibold text-sm text-amber-900 dark:text-amber-100">
          Suggestions IA
        </h3>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-4 gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-amber-600" />
          <span className="text-xs text-amber-700 dark:text-amber-300">
            Génération...
          </span>
        </div>
      ) : suggestions.length > 0 ? (
        <ul className="space-y-2">
          {suggestions.map((suggestion, idx) => (
            <li
              key={idx}
              className="text-xs text-amber-900 dark:text-amber-100 leading-relaxed"
            >
              <span className="font-semibold">•</span> {suggestion}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-amber-700 dark:text-amber-300">
          Aucune suggestion pour le moment
        </p>
      )}
    </div>
  )
}
