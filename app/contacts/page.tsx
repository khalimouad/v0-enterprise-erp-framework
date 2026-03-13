"use client"

import * as React from "react"
import { ERPHeader } from "@/components/erp-header"
import { ContactsTable } from "@/components/contacts/contacts-table"
import { ContactPanel } from "@/components/contacts/contact-panel"
import { ContactEditPanel } from "@/components/contacts/contact-edit-panel"
import type { Contact } from "@/lib/types"

// Sample data
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
  },
]

export default function ContactsPage() {
  const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null)
  const [editingContact, setEditingContact] = React.useState<Contact | null>(null)
  const [contacts, setContacts] = React.useState(sampleContacts)
  const [typeFilter, setTypeFilter] = React.useState<string>("all")

  const filteredContacts = React.useMemo(() => {
    if (typeFilter === "all") return contacts
    return contacts.filter((c) => c.type === typeFilter || (typeFilter === "both" && c.type === "both"))
  }, [contacts, typeFilter])

  const handleRowClick = (contact: Contact) => {
    setSelectedContact(contact)
    setEditingContact(null)
  }

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact)
    setSelectedContact(null)
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

  return (
    <div className="min-h-screen bg-background">
      <ERPHeader />
      <main className="flex h-[calc(100vh-7rem)]">
        {/* Main Table Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <ContactsTable
            contacts={filteredContacts}
            selectedContactId={selectedContact?.id || editingContact?.id}
            onRowClick={handleRowClick}
            onEdit={handleEdit}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            totalContacts={contacts.length}
          />
        </div>

        {/* Preview Panel */}
        {selectedContact && (
          <ContactPanel
            contact={selectedContact}
            onClose={handleClosePanel}
            onEdit={() => handleEdit(selectedContact)}
          />
        )}

        {/* Edit Panel */}
        {editingContact && (
          <ContactEditPanel
            contact={editingContact}
            onClose={handleCloseEditPanel}
            onSave={handleSaveContact}
          />
        )}
      </main>
    </div>
  )
}
