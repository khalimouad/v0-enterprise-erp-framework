"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactEditFullPage } from "@/components/contacts/contact-edit-full-page"
import type { Contact } from "@/lib/types"

const newContact: Contact = {
  id: `contact_${Date.now()}`,
  name: "",
  email: "",
  phone: "",
  initials: "",
  type: "customer",
  country: "Maroc",
  status: "prospect",
  tags: [],
  vatSubject: false,
  isSuspended: false,
  isProvisional: false,
  isExport: false,
  isCreditAllowed: false,
  taxRegime: "real",
}

export default function ContactCreatePage() {
  const router = useRouter()

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-100 dark:bg-slate-950">
      {/* Header with back button */}
      <div className="border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="h-10 w-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
            <h1 className="text-2xl font-bold">Créer un Nouveau Contact</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Ajouter un nouveau contact à votre système
            </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden p-4">
        <div className="h-full rounded-lg bg-white dark:bg-slate-900">
          <ContactEditFullPage contact={newContact} isCreating />
        </div>
      </div>
    </div>
  )
}
