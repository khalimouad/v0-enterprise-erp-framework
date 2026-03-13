"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContactDetailsForm } from "./contact-details-form"
import { ContactChangeLog } from "./contact-changelog"
import { ContactAIChat } from "./contact-ai-chat"
import type { Contact } from "@/lib/types"

interface ContactEditFullPageProps {
  contact: Contact
}

export function ContactEditFullPage({ contact }: ContactEditFullPageProps) {
  const [editedContact, setEditedContact] = React.useState<Contact>(contact)

  return (
    <div className="grid h-full grid-cols-3 gap-4 overflow-hidden p-6">
      {/* Left Panel - 1/3: Changelog & AI Chat */}
      <div className="col-span-1 flex flex-col gap-4 overflow-hidden">
        <Tabs defaultValue="changelog" className="flex h-full flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="changelog">Changelog</TabsTrigger>
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
          </TabsList>

          <TabsContent
            value="changelog"
            className="flex-1 overflow-hidden"
          >
            <ContactChangeLog contactId={contact.id} />
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
      <div className="col-span-2 overflow-hidden">
        <ContactDetailsForm
          contact={editedContact}
          onChange={setEditedContact}
        />
      </div>
    </div>
  )
}
