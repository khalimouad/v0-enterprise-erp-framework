"use client"

import * as React from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChangeLogEntry {
  id: string
  timestamp: string
  user: string
  note: string
}

interface ContactChangeLogProps {
  contactId: string
}

export function ContactChangeLog({ contactId }: ContactChangeLogProps) {
  const [entries, setEntries] = React.useState<ChangeLogEntry[]>([
    {
      id: "1",
      timestamp: "2024-03-13 14:30",
      user: "John Doe",
      note: "Updated payment terms from Net 30 to Net 15",
    },
    {
      id: "2",
      timestamp: "2024-03-12 10:15",
      user: "Jane Smith",
      note: "Changed status from Prospect to Active",
    },
    {
      id: "3",
      timestamp: "2024-03-10 09:45",
      user: "Mike Johnson",
      note: "Added customer to VIP program",
    },
  ])
  const [newNote, setNewNote] = React.useState("")

  const addNote = () => {
    if (newNote.trim()) {
      const entry: ChangeLogEntry = {
        id: String(Date.now()),
        timestamp: new Date().toLocaleString(),
        user: "Current User", // In real app, would get from auth context
        note: newNote,
      }
      setEntries([entry, ...entries])
      setNewNote("")
    }
  }

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id))
  }

  return (
    <div className="flex h-full flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      {/* Add Note Section */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Add Note</label>
        <Textarea
          placeholder="Add a comment or note about this contact..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="min-h-20 resize-none bg-slate-50 text-sm dark:bg-slate-700"
        />
        <Button
          onClick={addNote}
          size="sm"
          className="w-full gap-2"
          disabled={!newNote.trim()}
        >
          <Plus className="h-4 w-4" />
          Add Note
        </Button>
      </div>

      {/* History List */}
      <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
        <h3 className="mb-3 text-sm font-semibold">History</h3>
        <ScrollArea className="h-96">
          <div className="space-y-3 pr-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-700"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {entry.user}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {entry.timestamp}
                      </span>
                    </div>
                    <p className="mt-1 text-slate-700 dark:text-slate-300">
                      {entry.note}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0"
                    onClick={() => deleteEntry(entry.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
