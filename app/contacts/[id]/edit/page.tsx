"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactEditFullPage } from "@/components/contacts/contact-edit-full-page"
import type { Contact } from "@/lib/types"

// Sample contacts data (in real app, would come from database)
const sampleContacts: Contact[] = [
  {
    id: "c1",
    name: "Global Industries Ltd.",
    email: "contact@globalind.com",
    phone: "+1 (555) 012-3456",
    initials: "GI",
    type: "customer",
    country: "United States",
    city: "New York",
    address: "350 Fifth Avenue, Suite 5100",
    paymentTerms: "Net 30 Days",
    currency: "USD",
    customerRank: 5,
    tags: ["VIP", "Enterprise"],
    createdAt: "2023-01-15",
    status: "active",
    industry: "Manufacturing",
    website: "www.globalind.com",
  },
  {
    id: "c2",
    name: "Apex Solutions",
    email: "orders@apex.com",
    phone: "+1 (555) 234-5678",
    initials: "AS",
    type: "customer",
    country: "United States",
    city: "San Francisco",
    address: "100 Market Street",
    paymentTerms: "Immediate",
    currency: "USD",
    customerRank: 3,
    tags: ["Startup"],
    createdAt: "2023-03-22",
    status: "active",
    industry: "Technology",
    website: "www.apex.com",
  },
]

export default function ContactEditPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const contact = sampleContacts.find((c) => c.id === params.id)

  if (!contact) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Contact not found</h1>
          <Button
            onClick={() => router.push("/contacts")}
            className="mt-4"
          >
            Back to Contacts
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-slate-50 dark:bg-slate-950">
      {/* Header with Back Button */}
      <div className="border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/contacts")}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{contact.name}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Editing contact information
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ContactEditFullPage contact={contact} />
      </div>
    </div>
  )
}
