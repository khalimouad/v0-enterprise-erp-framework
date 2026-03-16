"use client"

import * as React from "react"
import { Search, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AISearchInputProps {
  onSearch: (query: string, results?: string) => void
  placeholder?: string
  userPermissions?: string
}

export function AISearchInput({ 
  onSearch, 
  placeholder = "Search contacts with AI...",
  userPermissions = "all"
}: AISearchInputProps) {
  const [query, setQuery] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSearch = React.useCallback(async () => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      // Call the AI-powered search API with Gemini
      const response = await fetch("/api/chat/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: query,
          purpose: "search",
          userPermissions: userPermissions,
          context: {
            purpose: "search_contacts",
            searchField: "all",
          },
          conversationHistory: [],
        }),
      })

      const data = await response.json()
      if (data.success) {
        console.log("[v0] AI search result:", data.response)
        onSearch(query, data.response)
      } else {
        console.error("[v0] Search error:", data.error)
        onSearch(query)
      }
    } catch (error) {
      console.error("[v0] AI search error:", error)
      onSearch(query)
    } finally {
      setIsLoading(false)
    }
  }, [query, onSearch, userPermissions])

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch()
          }}
          placeholder={placeholder}
          className="pl-10 pr-10"
        />
        <Sparkles className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-500" />
      </div>
      <Button
        onClick={handleSearch}
        disabled={!query.trim() || isLoading}
        size="icon"
        variant="outline"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Search className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
