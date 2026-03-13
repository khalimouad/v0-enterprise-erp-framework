"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContactDetailsForm } from "./contact-details-form"
import { ContactChangeLog } from "./contact-changelog"
import { ContactAIChat } from "./contact-ai-chat"
import type { Contact } from "@/lib/types"

interface ContactEditFullPageProps {
  contact: Contact
  isCreating?: boolean
}

export function ContactEditFullPage({ contact, isCreating }: ContactEditFullPageProps) {
  const [editedContact, setEditedContact] = React.useState<Contact>(contact)

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("[v0] Saving contact:", editedContact)
  }

  const handleCancel = () => {
    // TODO: Implement cancel logic
  }

  return (
    <div className="grid h-full grid-cols-1 gap-6 overflow-hidden p-6 lg:grid-cols-3">
      {/* Left Panel - 2/3: Contact Details */}
      <div className="col-span-1 overflow-hidden rounded-lg border-2 border-slate-300 bg-white shadow-md dark:border-slate-600 dark:bg-slate-800 lg:col-span-2">
        <ContactDetailsForm
          contact={editedContact}
          onChange={setEditedContact}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>

      {/* Right Panel - 1/3: Changelog & AI Chat */}
      <div className="col-span-1 flex flex-col overflow-hidden lg:col-span-1">
        <Tabs defaultValue="changelog" className="flex flex-col overflow-hidden rounded-lg border-2 border-blue-400 bg-white shadow-md dark:border-blue-600 dark:bg-slate-800">
          <TabsList className="grid w-full grid-cols-2 gap-0 border-b-2 border-blue-200 bg-gradient-to-r from-blue-50 to-slate-50 p-1 dark:border-blue-700 dark:from-blue-900 dark:to-slate-700">
            <TabsTrigger value="changelog" className="text-xs font-semibold md:text-sm">
              Historique
            </TabsTrigger>
            <TabsTrigger value="chat" className="text-xs font-semibold md:text-sm">
              Assistant IA
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="changelog"
            className="flex-1 overflow-auto p-4"
          >
            {!isCreating ? (
              <ContactChangeLog contactId={contact.id} />
            ) : (
              <div className="flex items-center justify-center p-4 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  L'historique apparaîtra après l'enregistrement
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="chat"
            className="flex-1 overflow-auto p-4"
          >
            <ContactAIChat contact={editedContact} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

