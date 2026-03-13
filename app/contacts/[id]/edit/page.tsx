"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Share2, Settings, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const { id } = React.use(params)
  const contact = sampleContacts.find((c) => c.id === id)

  if (!contact) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Contact non trouvé</h1>
          <Button
            onClick={() => router.push("/contacts")}
            className="mt-4"
          >
            Retour aux Contacts
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-slate-50 dark:bg-slate-950">
      {/* Header with Navigation and Menu */}
      <div className="border-b-2 border-slate-300 bg-gradient-to-r from-white to-slate-50 px-6 py-4 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Back Button & Title */}
          <div className="flex items-center gap-4 flex-1">
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
                Modification des informations de contact
              </p>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-slate-300 dark:border-slate-600"
              onClick={() => console.log("[v0] Download contact")}
            >
              <Download className="h-4 w-4" />
              Télécharger
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-slate-300 dark:border-slate-600"
              onClick={() => console.log("[v0] Share contact")}
            >
              <Share2 className="h-4 w-4" />
              Partager
            </Button>

            {/* More Actions Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-slate-300 dark:border-slate-600"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => console.log("[v0] Duplicate")}>
                  Dupliquer le contact
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("[v0] Archive")}>
                  Archiver
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("[v0] Export PDF")}>
                  Exporter en PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("[v0] Print")}>
                  Imprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
