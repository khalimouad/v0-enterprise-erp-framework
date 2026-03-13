"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ERPHeader, type ColorTheme } from "@/components/erp-header"
import { ContactsListView } from "@/components/contacts/contacts-list-view"
import { ContactPanel } from "@/components/contacts/contact-panel"
import { ContactEditPanel } from "@/components/contacts/contact-edit-panel"
import { ContactsFilters } from "@/components/contacts/contacts-filters"
import type { Contact } from "@/lib/types"

// Sample data - Extended
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
  {
    id: "c3",
    name: "Nova Technologies",
    email: "procurement@nova.tech",
    phone: "+1 (555) 345-6789",
    initials: "NT",
    type: "customer",
    country: "Canada",
    city: "Toronto",
    address: "200 Bay Street",
    paymentTerms: "Net 15 Days",
    currency: "CAD",
    customerRank: 4,
    tags: ["Tech"],
    createdAt: "2023-05-10",
    status: "active",
    industry: "Technology",
    website: "www.nova.tech",
  },
  {
    id: "c4",
    name: "Zenith Manufacturing",
    email: "supply@zenith.com",
    phone: "+1 (555) 456-7890",
    initials: "ZM",
    type: "both",
    country: "United States",
    city: "Chicago",
    address: "233 S Wacker Drive",
    paymentTerms: "Net 30 Days",
    currency: "USD",
    customerRank: 5,
    supplierRank: 4,
    tags: ["Manufacturing", "Partner"],
    createdAt: "2022-11-05",
    status: "active",
    industry: "Manufacturing",
    website: "www.zenith.com",
  },
  {
    id: "c5",
    name: "Metro Systems Inc.",
    email: "orders@metrosys.com",
    phone: "+1 (555) 567-8901",
    initials: "MS",
    type: "customer",
    country: "United States",
    city: "Boston",
    address: "100 Federal Street",
    paymentTerms: "Net 30 Days",
    currency: "USD",
    customerRank: 4,
    tags: ["Enterprise"],
    createdAt: "2023-02-18",
    status: "active",
    industry: "Services",
    website: "www.metrosys.com",
  },
  {
    id: "c6",
    name: "Pacific Trading Co.",
    email: "buy@pacific.co",
    phone: "+1 (555) 678-9012",
    initials: "PT",
    type: "supplier",
    country: "China",
    city: "Shanghai",
    address: "88 Century Avenue, Pudong",
    paymentTerms: "Net 45 Days",
    currency: "CNY",
    supplierRank: 5,
    tags: ["Import", "Electronics"],
    createdAt: "2022-08-12",
    status: "active",
    industry: "Trading",
    website: "www.pacific.co",
  },
  {
    id: "c7",
    name: "EuroTech Supplies",
    email: "info@eurotech.eu",
    phone: "+49 30 1234567",
    initials: "ES",
    type: "supplier",
    country: "Germany",
    city: "Berlin",
    address: "Unter den Linden 77",
    paymentTerms: "Net 30 Days",
    currency: "EUR",
    supplierRank: 4,
    tags: ["Europe", "Hardware"],
    createdAt: "2023-04-01",
    status: "active",
    industry: "Distribution",
    website: "www.eurotech.eu",
  },
  {
    id: "c8",
    name: "Deco Addict",
    email: "hello@decoaddict.com",
    phone: "+1 (555) 789-0123",
    initials: "DA",
    type: "customer",
    country: "United States",
    city: "Los Angeles",
    address: "8500 Wilshire Blvd",
    paymentTerms: "Net 15 Days",
    currency: "USD",
    customerRank: 2,
    tags: ["Retail", "Design"],
    createdAt: "2023-06-20",
    status: "inactive",
    industry: "Retail",
    website: "www.decoaddict.com",
  },
  {
    id: "c9",
    name: "Nordic Imports",
    email: "sales@nordicimports.se",
    phone: "+46 8 123 4567",
    initials: "NI",
    type: "supplier",
    country: "Sweden",
    city: "Stockholm",
    address: "Kungsgatan 44",
    paymentTerms: "Net 60 Days",
    currency: "EUR",
    supplierRank: 3,
    tags: ["Europe", "Furniture"],
    createdAt: "2023-07-15",
    status: "active",
    industry: "Import/Export",
    website: "www.nordicimports.se",
  },
  {
    id: "c10",
    name: "TechStart Inc.",
    email: "info@techstart.io",
    phone: "+1 (555) 890-1234",
    initials: "TS",
    type: "customer",
    country: "United States",
    city: "Austin",
    address: "500 Congress Avenue",
    paymentTerms: "Net 15 Days",
    currency: "USD",
    customerRank: 1,
    tags: ["Startup", "Tech"],
    createdAt: "2024-01-10",
    status: "prospect",
    industry: "Technology",
    website: "www.techstart.io",
  },
]

export default function ContactsPage() {
  const router = useRouter()
  const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null)
  const [editingContact, setEditingContact] = React.useState<Contact | null>(null)
  const [contacts, setContacts] = React.useState(sampleContacts)
  const [colorTheme, setColorTheme] = React.useState<ColorTheme>("slate")
  const [filtersOpen, setFiltersOpen] = React.useState(false)

  const handleRowClick = (contact: Contact) => {
    setSelectedContact(contact)
    setEditingContact(null)
  }

  const handleEdit = (contact: Contact) => {
    // Navigate to full-page edit route instead of opening side panel
    router.push(`/contacts/${contact.id}/edit`)
  }

  const handleClosePanel = () => {
    setSelectedContact(null)
  }

  const handleCloseEditPanel = () => {
    setEditingContact(null)
  }

  const handleSaveContact = (updatedContact: Contact) => {
    setContacts((prev) => prev.map((c) => (c.id === updatedContact.id ? updatedContact : c)))
    setEditingContact(null)
    setSelectedContact(updatedContact)
  }

  const handleCreateContact = () => {
    // Navigate to create page
    router.push("/contacts/create")
  }

  return (
    <div className="min-h-screen bg-background">
      <ERPHeader colorTheme={colorTheme} onThemeChange={setColorTheme} />
      <main className="flex h-[calc(100vh-7rem)]">
        {/* Filters Sidebar */}
        <ContactsFilters
          isOpen={filtersOpen}
          onClose={() => setFiltersOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <ContactsListView
            contacts={contacts}
            selectedContactId={selectedContact?.id || editingContact?.id}
            onRowClick={handleRowClick}
            onEdit={handleEdit}
            onCreateContact={handleCreateContact}
            onOpenFilters={() => setFiltersOpen(true)}
            colorTheme={colorTheme}
          />
        </div>

        {/* Preview Panel */}
        {selectedContact && (
          <ContactPanel
            contact={selectedContact}
            onClose={handleClosePanel}
            onEdit={() => handleEdit(selectedContact)}
            colorTheme={colorTheme}
          />
        )}

        {/* Edit Panel */}
        {editingContact && (
          <ContactEditPanel
            contact={editingContact}
            onClose={handleCloseEditPanel}
            onSave={handleSaveContact}
            colorTheme={colorTheme}
          />
        )}
      </main>
    </div>
  )
}
