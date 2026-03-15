"use client"

import * as React from "react"
import { Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import type { Contact } from "@/lib/types"

interface ChatMessage {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: string
}

interface ContactAIChatProps {
  contact: Contact
}

export function ContactAIChat({ contact }: ContactAIChatProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "1",
      type: "assistant",
      content: `Bonjour ! Je suis là pour vous aider avec ${contact.name}. Vous pouvez me poser des questions sur les détails de ce contact, son historique ou me demander des suggestions. Que souhaitez-vous savoir ?`,
      timestamp: new Date().toLocaleTimeString("fr-FR"),
    },
  ])
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector(
          "[data-radix-scroll-area-viewport]"
        )
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight
        }
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: String(Date.now()),
      type: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString("fr-FR"),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Call Gemini API
      const response = await fetch("/api/chat/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: input,
          context: {
            contactName: contact.name,
            type: contact.type,
            status: contact.status,
            tags: contact.tags,
          },
          conversationHistory: messages,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from AI")
      }

      const data = await response.json()
      const assistantMessage: ChatMessage = {
        id: String(Date.now() + 1),
        type: "assistant",
        content: data.response || "Désolé, je n'ai pas pu générer de réponse.",
        timestamp: new Date().toLocaleTimeString("fr-FR"),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("[v0] Error calling Gemini:", error)
      const errorMessage: ChatMessage = {
        id: String(Date.now() + 1),
        type: "assistant",
        content:
          "Je rencontre une difficulté pour me connecter au service d'IA Gemini. Veuillez vous assurer que votre clé API est correctement configurée.",
        timestamp: new Date().toLocaleTimeString("fr-FR"),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      {/* Chat Messages */}
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="space-y-3 pr-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs rounded-lg px-3 py-2 text-sm ${
                  message.type === "user"
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-slate-100"
                }`}
              >
                <p>{message.content}</p>
                <span className="mt-1 block text-xs opacity-70">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-700">
                <Loader2 className="h-4 w-4 animate-spin text-slate-600 dark:text-slate-300" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
        <div className="flex gap-2">
          <Input
            placeholder="Posez une question sur ce contact..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            disabled={isLoading}
            className="bg-slate-50 dark:bg-slate-700"
          />
          <Button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            size="icon"
            className="shrink-0"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
