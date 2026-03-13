"use client"

import * as React from "react"
import { Search, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AISearchInputProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function AISearchInput({ onSearch, placeholder = "Search with AI..." }: AISearchInputProps) {
  const [query, setQuery] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSearch = React.useCallback(async () => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      // Call the AI-powered search API
      const response = await fetch("/api/chat/ollama", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: query,
          context: {
            purpose: "search_contacts",
            searchField: "all",
          },
          conversationHistory: [],
        }),
      })

      const data = await response.json()
      console.log("[v0] AI search result:", data.response)
      onSearch(query)
    } catch (error) {
      console.error("[v0] AI search error:", error)
      onSearch(query)
    } finally {
      setIsLoading(false)
    }
  }, [query, onSearch])

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
          className="pl-10"
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
