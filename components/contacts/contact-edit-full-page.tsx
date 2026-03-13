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
    <div className="grid h-full grid-cols-1 gap-4 overflow-hidden p-6 lg:grid-cols-3">
      {/* Left Panel - 1/3: Changelog & AI Chat */}
      <div className="col-span-1 flex flex-col gap-4 overflow-hidden lg:col-span-1">
        <Tabs defaultValue="changelog" className="flex h-full flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="changelog">Changelog</TabsTrigger>
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
          </TabsList>

          <TabsContent
            value="changelog"
            className="flex-1 overflow-hidden"
          >
            {!isCreating ? (
              <ContactChangeLog contactId={contact.id} />
            ) : (
              <div className="flex items-center justify-center p-4 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Changelog will appear after saving
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="chat"
            className="flex-1 overflow-hidden"
          >
            <ContactAIChat contact={editedContact} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Panel - 2/3: Contact Details */}
      <div className="col-span-1 overflow-hidden lg:col-span-2">
        <ContactDetailsForm
          contact={editedContact}
          onChange={setEditedContact}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}

