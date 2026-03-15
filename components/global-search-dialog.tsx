"use client"

import * as React from "react"
import { Search, Sparkles, Loader2, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface GlobalSearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userPermissions?: string
}

interface SearchResult {
  type: "suggestion" | "contact" | "info"
  title: string
  description?: string
  icon?: string
}

export function GlobalSearchDialog({ 
  open, 
  onOpenChange,
  userPermissions = "all"
}: GlobalSearchDialogProps) {
  const [query, setQuery] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [aiSuggestion, setAiSuggestion] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  const performSearch = React.useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setAiSuggestion("")
      return
    }

    setIsLoading(true)
    try {
      // Call Gemini API for AI-powered search suggestions
      const response = await fetch("/api/chat/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: searchQuery,
          purpose: "search",
          userPermissions: userPermissions,
          context: {},
          conversationHistory: [],
        }),
      })

      const data = await response.json()
      if (data.success) {
        setAiSuggestion(data.response)
        
        // Parse AI suggestions into results
        const suggestionLines = data.response.split('\n').filter((line: string) => line.trim())
        const parsedResults: SearchResult[] = suggestionLines
          .slice(0, 5)
          .map((line: string, idx: number) => ({
            type: "suggestion" as const,
            title: line.replace(/^[\d+.\-*]\s*/, '').trim(),
            icon: "sparkles",
          }))
        
        setResults(parsedResults)
      }
    } catch (error) {
      console.error("[v0] Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }, [userPermissions])

  const handleSearch = React.useCallback(
    async (searchQuery: string) => {
      setQuery(searchQuery)
      await performSearch(searchQuery)
    },
    [performSearch]
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 border-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Global Search</DialogTitle>
        </DialogHeader>
        
        {/* Search Input */}
        <div className="border-b border-slate-200 dark:border-slate-700 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search contacts, suggestions, or ask AI for help..."
              className="pl-10 pr-10 py-2 text-base border-0 bg-transparent focus-visible:ring-0"
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => handleSearch("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Results */}
        <ScrollArea className="h-[400px]">
          <div className="p-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-blue-500 mr-2" />
                <span className="text-sm text-muted-foreground">Searching...</span>
              </div>
            ) : query ? (
              <>
                {aiSuggestion && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      <h3 className="text-sm font-semibold text-foreground">AI Suggestions</h3>
                    </div>
                    <div className="text-sm text-muted-foreground bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                      {aiSuggestion}
                    </div>
                  </div>
                )}

                {results.length > 0 ? (
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Results
                    </h3>
                    <div className="space-y-2">
                      {results.map((result, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            // Handle result click - can navigate to contact or perform action
                            onOpenChange(false)
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <div className="font-medium text-sm text-foreground">{result.title}</div>
                          {result.description && (
                            <div className="text-xs text-muted-foreground">{result.description}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">No results found</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-sm text-muted-foreground">Start typing to search contacts</p>
                <p className="text-xs text-muted-foreground mt-2">or ask AI for recommendations</p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-2 bg-slate-50 dark:bg-slate-900 flex items-center justify-between text-xs text-muted-foreground">
          <div>Press <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-xs font-mono">Esc</kbd> to close</div>
          <div>Powered by Gemini AI</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
