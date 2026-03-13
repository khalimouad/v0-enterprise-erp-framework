"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Share2, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
    <div className="flex h-screen flex-col bg-slate-50 dark:bg-slate-950">
      {/* Header with Navigation and Menu */}
      <div className="border-b-2 border-slate-300 bg-gradient-to-r from-white to-slate-50 px-6 py-4 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Back Button & Title */}
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Créer un Nouveau Contact</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Ajouter un nouveau contact à votre système
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
                <DropdownMenuItem onClick={() => console.log("[v0] Template")}>
                  Utiliser un modèle
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("[v0] Import")}>
                  Importer les données
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ContactEditFullPage contact={newContact} isCreating />
      </div>
    </div>
  )
}
