"use client"

import * as React from "react"
import { Search, Filter, Columns, Download, Plus, MoreVertical, ChevronLeft, ChevronRight, Edit, Trash2, Copy, Mail, Phone, Star, Archive, FileText, Printer, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Contact } from "@/lib/types"
import { contactTypeConfig } from "@/lib/types"

interface ContactsTableProps {
  contacts: Contact[]
  selectedContactId?: string
  onRowClick: (contact: Contact) => void
  onEdit: (contact: Contact) => void
  typeFilter: string
  onTypeFilterChange: (type: string) => void
  totalContacts: number
}

const typeTabs = [
  { id: "all", label: "All Contacts" },
  { id: "customer", label: "Customers" },
  { id: "supplier", label: "Suppliers" },
  { id: "both", label: "Partners" },
]

export function ContactsTable({
  contacts,
  selectedContactId,
  onRowClick,
  onEdit,
  typeFilter,
  onTypeFilterChange,
  totalContacts,
}: ContactsTableProps) {
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = React.useState("")
  const [pageSize, setPageSize] = React.useState(25)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [editingPageRange, setEditingPageRange] = React.useState(false)
  const [pageRangeInput, setPageRangeInput] = React.useState(`1-${Math.min(25, contacts.length)}`)

  const filteredContacts = React.useMemo(() => {
    if (!searchQuery) return contacts
    const query = searchQuery.toLowerCase()
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.phone.includes(query) ||
        c.country?.toLowerCase().includes(query) ||
        c.city?.toLowerCase().includes(query)
    )
  }, [contacts, searchQuery])

  const toggleRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedRows((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const toggleAll = () => {
    if (selectedRows.size === filteredContacts.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(filteredContacts.map((c) => c.id)))
    }
  }

  // Bulk action handlers
  const handleBulkDelete = () => {
    console.log("[v0] Delete selected contacts:", Array.from(selectedRows))
    // TODO: Implement delete action
    setSelectedRows(new Set())
  }

  const handleBulkArchive = () => {
    console.log("[v0] Archive selected contacts:", Array.from(selectedRows))
    // TODO: Implement archive action
    setSelectedRows(new Set())
  }

  const handleExportCSV = () => {
    const selectedContacts = filteredContacts.filter((c) => selectedRows.has(c.id))
    const csv = [
      ["Name", "Email", "Phone", "Location", "Type", "Tags"],
      ...selectedContacts.map((c) => [
        c.name,
        c.email,
        c.phone,
        `${c.city || ""}, ${c.country || ""}`.trim(),
        c.type || "",
        c.tags?.join("; ") || "",
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "contacts.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleExportPDF = () => {
    console.log("[v0] Export PDF for selected contacts:", Array.from(selectedRows))
    // TODO: Implement PDF export
  }

  const handlePrint = () => {
    const selectedContacts = filteredContacts.filter((c) => selectedRows.has(c.id))
    const printContent = selectedContacts
      .map(
        (c) =>
          `<div style="page-break-inside: avoid; margin-bottom: 20px; padding: 10px; border: 1px solid #ccc;">
        <strong>${c.name}</strong><br/>
        Email: ${c.email}<br/>
        Phone: ${c.phone}<br/>
        Location: ${c.city || ""}, ${c.country || ""}<br/>
        Type: ${c.type || ""}<br/>
        Tags: ${c.tags?.join(", ") || ""}<br/>
      </div>`
      )
      .join("")

    const printWindow = window.open("", "", "width=800,height=600")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Contacts</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Bulk Actions Toolbar */}
      {selectedRows.size > 0 && (
        <div className="px-4 py-3 border-b border-border bg-blue-50 dark:bg-blue-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">
              {selectedRows.size} selected
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedRows(new Set())}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-8"
              onClick={handleExportCSV}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">CSV</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-8"
              onClick={handleExportPDF}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">PDF</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-8"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Print</span>
            </Button>
            <div className="border-l border-border pl-2" />
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-8"
              onClick={handleBulkArchive}
            >
              <Archive className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Archive</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-8 text-destructive hover:text-destructive"
              onClick={handleBulkDelete}
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Delete</span>
            </Button>
          </div>
        </div>
      )}
      {/* Table Header / Actions */}
      <div className="p-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[300px]">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search contacts, email, phone..."
              className="pl-10 bg-muted/50 border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Columns className="h-4 w-4" />
            Columns
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button size="sm" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="h-4 w-4" />
            Create Contact
          </Button>
        </div>
      </div>

      {/* Type Tabs */}
      <div className="flex px-4 py-2 gap-1 border-b border-border overflow-x-auto">
        {typeTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTypeFilterChange(tab.id)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
              typeFilter === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="sticky top-0 bg-muted/50 z-10">
            <tr className="text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
              <th className="px-4 py-3 w-10">
                <Checkbox
                  checked={selectedRows.size === filteredContacts.length && filteredContacts.length > 0}
                  onCheckedChange={toggleAll}
                />
              </th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Tags</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {filteredContacts.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((contact) => {
              const isSelected = selectedContactId === contact.id
              const isChecked = selectedRows.has(contact.id)
              const typeCfg = contact.type ? contactTypeConfig[contact.type] : null

              return (
                <tr
                  key={contact.id}
                  onClick={() => onRowClick(contact)}
                  className={cn(
                    "cursor-pointer transition-colors",
                    isSelected
                      ? "bg-accent/10 border-l-4 border-l-accent"
                      : "hover:bg-muted/50 border-l-4 border-l-transparent"
                  )}
                >
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={isChecked}
                      onClick={(e) => toggleRow(contact.id, e)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                        {contact.initials}
                      </div>
                      <div>
                        <span className={cn("font-semibold", isSelected && "text-accent")}>{contact.name}</span>
                        {(contact.customerRank ?? 0) >= 4 && (
                          <Star className="inline h-3 w-3 ml-1 text-amber-500 fill-amber-500" />
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{contact.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{contact.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {contact.city && contact.country ? `${contact.city}, ${contact.country}` : contact.country || "-"}
                  </td>
                  <td className="px-4 py-3">
                    {typeCfg && (
                      <span className={cn("px-2 py-1 rounded-full text-[10px] font-bold", typeCfg.className)}>
                        {typeCfg.label.toUpperCase()}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {contact.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      {(contact.tags?.length ?? 0) > 2 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground">
                          +{(contact.tags?.length ?? 0) - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(contact); }}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
      <footer className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Total: <span className="font-semibold text-foreground">{filteredContacts.length.toLocaleString()} contacts</span>
        </div>
        <div className="flex items-center gap-4">
          {editingPageRange ? (
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={pageRangeInput}
                onChange={(e) => setPageRangeInput(e.target.value)}
                placeholder="1-25"
                className="h-8 w-24 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // Parse the input like "1-25" or "1-100"
                    const match = pageRangeInput.match(/(\d+)-(\d+)/)
                    if (match) {
                      const start = parseInt(match[1])
                      const end = parseInt(match[2])
                      const newPageSize = end - start + 1
                      setPageSize(newPageSize)
                      setCurrentPage(1)
                    }
                    setEditingPageRange(false)
                  } else if (e.key === "Escape") {
                    setEditingPageRange(false)
                  }
                }}
                autoFocus
              />
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-2"
                onClick={() => {
                  const match = pageRangeInput.match(/(\d+)-(\d+)/)
                  if (match) {
                    const start = parseInt(match[1])
                    const end = parseInt(match[2])
                    const newPageSize = end - start + 1
                    setPageSize(newPageSize)
                    setCurrentPage(1)
                  }
                  setEditingPageRange(false)
                }}
              >
                OK
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-2"
                onClick={() => {
                  setEditingPageRange(false)
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <button
              onClick={() => {
                const start = (currentPage - 1) * pageSize + 1
                const end = Math.min(currentPage * pageSize, filteredContacts.length)
                setPageRangeInput(`${start}-${end}`)
                setEditingPageRange(true)
              }}
              className="hover:text-foreground transition-colors cursor-pointer font-semibold"
            >
              {Math.max(1, (currentPage - 1) * pageSize + 1)}-{Math.min(currentPage * pageSize, filteredContacts.length)} of {filteredContacts.length}
            </button>
          )}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={currentPage * pageSize >= filteredContacts.length}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
