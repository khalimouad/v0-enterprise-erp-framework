"use client"

import * as React from "react"
import {
  Search,
  Filter,
  Columns,
  Download,
  Plus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Copy,
  Mail,
  Phone,
  Star,
  LayoutGrid,
  List,
  Kanban,
  X,
  ChevronDown,
  Check,
  SlidersHorizontal,
  Building2,
  Globe,
  CreditCard,
  Calendar,
  Tag,
  MapPin,
  Archive,
  FileText,
  Printer,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Contact } from "@/lib/types"
import { contactTypeConfig, contactStatusConfig } from "@/lib/types"
import type { ColorTheme } from "@/components/erp-header"

type ViewMode = "table" | "cards" | "kanban"

interface ContactsListViewProps {
  contacts: Contact[]
  selectedContactId?: string
  onRowClick: (contact: Contact) => void
  onEdit: (contact: Contact) => void
  onCreateContact: () => void
  onOpenFilters?: () => void
  colorTheme: ColorTheme
}

// Column definitions
interface ColumnDef {
  id: string
  label: string
  visible: boolean
  width?: string
}

const defaultColumns: ColumnDef[] = [
  { id: "name", label: "Name", visible: true, width: "200px" },
  { id: "email", label: "Email", visible: true },
  { id: "phone", label: "Phone", visible: true },
  { id: "location", label: "Location", visible: true },
  { id: "type", label: "Type", visible: true },
  { id: "status", label: "Status", visible: true },
  { id: "industry", label: "Industry", visible: false },
  { id: "paymentTerms", label: "Payment Terms", visible: false },
  { id: "currency", label: "Currency", visible: false },
  { id: "tags", label: "Tags", visible: true },
  { id: "createdAt", label: "Created", visible: false },
]

// Filter field definitions
interface FilterField {
  id: keyof Contact | "location"
  label: string
  type: "text" | "select" | "multiselect"
  options?: { value: string; label: string }[]
}

const filterFields: FilterField[] = [
  { id: "name", label: "Name", type: "text" },
  { id: "email", label: "Email", type: "text" },
  { id: "phone", label: "Phone", type: "text" },
  { id: "type", label: "Type", type: "select", options: [
    { value: "customer", label: "Customer" },
    { value: "supplier", label: "Supplier" },
    { value: "both", label: "Customer & Supplier" },
  ]},
  { id: "status", label: "Status", type: "select", options: [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "prospect", label: "Prospect" },
  ]},
  { id: "country", label: "Country", type: "text" },
  { id: "city", label: "City", type: "text" },
  { id: "industry", label: "Industry", type: "text" },
  { id: "paymentTerms", label: "Payment Terms", type: "select", options: [
    { value: "Immediate", label: "Immediate" },
    { value: "Net 15 Days", label: "Net 15 Days" },
    { value: "Net 30 Days", label: "Net 30 Days" },
    { value: "Net 45 Days", label: "Net 45 Days" },
    { value: "Net 60 Days", label: "Net 60 Days" },
  ]},
  { id: "currency", label: "Currency", type: "select", options: [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
    { value: "CAD", label: "CAD" },
    { value: "CNY", label: "CNY" },
  ]},
]

interface ActiveFilter {
  field: string
  operator: "contains" | "equals" | "startsWith"
  value: string
}

// Kanban columns
const kanbanColumns = [
  { id: "prospect", label: "Prospects", color: "bg-amber-500" },
  { id: "active", label: "Active", color: "bg-green-500" },
  { id: "inactive", label: "Inactive", color: "bg-slate-400" },
]

export function ContactsListView({
  contacts,
  selectedContactId,
  onRowClick,
  onEdit,
  onCreateContact,
  onOpenFilters,
  colorTheme,
}: ContactsListViewProps) {
  const [viewMode, setViewMode] = React.useState<ViewMode>("table")
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = React.useState("")
  const [columns, setColumns] = React.useState<ColumnDef[]>(defaultColumns)
  const [activeFilters, setActiveFilters] = React.useState<ActiveFilter[]>([])
  const [filterPanelOpen, setFilterPanelOpen] = React.useState(false)
  const [typeFilter, setTypeFilter] = React.useState<string>("all")
  const [pageSize, setPageSize] = React.useState(10)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [editingPageRange, setEditingPageRange] = React.useState(false)
  const [pageRangeInput, setPageRangeInput] = React.useState("1-10")

  // Apply filters
  const filteredContacts = React.useMemo(() => {
    let result = contacts

    // Type filter
    if (typeFilter !== "all") {
      result = result.filter((c) => c.type === typeFilter || (typeFilter === "both" && c.type === "both"))
    }

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query) ||
          c.phone.includes(query) ||
          c.country?.toLowerCase().includes(query) ||
          c.city?.toLowerCase().includes(query) ||
          c.industry?.toLowerCase().includes(query)
      )
    }

    // Active filters
    activeFilters.forEach((filter) => {
      result = result.filter((c) => {
        const value = c[filter.field as keyof Contact]
        if (!value) return false
        const strValue = String(value).toLowerCase()
        const filterValue = filter.value.toLowerCase()
        
        switch (filter.operator) {
          case "contains":
            return strValue.includes(filterValue)
          case "equals":
            return strValue === filterValue
          case "startsWith":
            return strValue.startsWith(filterValue)
          default:
            return true
        }
      })
    })

    return result
  }, [contacts, typeFilter, searchQuery, activeFilters])

  const toggleColumn = (columnId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    )
  }

  const addFilter = (fieldId: string) => {
    const field = filterFields.find((f) => f.id === fieldId)
    if (field) {
      setActiveFilters((prev) => [
        ...prev,
        { field: fieldId, operator: "contains", value: "" },
      ])
    }
  }

  const updateFilter = (index: number, updates: Partial<ActiveFilter>) => {
    setActiveFilters((prev) =>
      prev.map((f, i) => (i === index ? { ...f, ...updates } : f))
    )
  }

  const removeFilter = (index: number) => {
    setActiveFilters((prev) => prev.filter((_, i) => i !== index))
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setTypeFilter("all")
    setSearchQuery("")
  }

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

  // Get accent color based on theme
  const getAccentClass = () => {
    switch (colorTheme) {
      case "orange":
        return "bg-orange-500 text-white hover:bg-orange-600"
      case "navy":
        return "bg-blue-700 text-white hover:bg-blue-800"
      default:
        return "bg-slate-700 text-white hover:bg-slate-800"
    }
  }

  const getAccentTextClass = () => {
    switch (colorTheme) {
      case "orange":
        return "text-orange-600"
      case "navy":
        return "text-blue-700"
      default:
        return "text-slate-700"
    }
  }

  const getAccentBorderClass = () => {
    switch (colorTheme) {
      case "orange":
        return "border-orange-500"
      case "navy":
        return "border-blue-700"
      default:
        return "border-slate-600"
    }
  }

  const getAccentBgClass = () => {
    switch (colorTheme) {
      case "orange":
        return "bg-orange-500/10"
      case "navy":
        return "bg-blue-700/10"
      default:
        return "bg-slate-600/10"
    }
  }

  const visibleColumns = columns.filter((c) => c.visible)

  const typeTabs = [
    { id: "all", label: "All Contacts" },
    { id: "customer", label: "Customers" },
    { id: "supplier", label: "Suppliers" },
    { id: "both", label: "Partners" },
  ]

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Toolbar - All controls on one line */}
      <div className="p-3 md:p-4 border-b border-border">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {/* Normal Search Input */}
          <div className="relative w-96 md:max-w-xl">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 pl-8 text-sm"
            />
          </div>

          {/* Filters Button - Opens Sidebar */}
          {onOpenFilters && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-8"
              onClick={onOpenFilters}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline text-xs md:text-sm">Filters</span>
            </Button>
          )}

          {/* Columns Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 text-xs md:text-sm h-8">
                <Columns className="h-4 w-4" />
                <span className="hidden sm:inline">Columns</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {columns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.visible}
                  onCheckedChange={() => toggleColumn(column.id)}
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Mode Buttons */}
          <div className="flex items-center border border-border rounded-lg p-1 bg-muted/30">
            <Button
              variant="ghost"
              size="sm"
              className={cn("h-7 px-2", viewMode === "table" && getAccentBgClass())}
              onClick={() => setViewMode("table")}
              title="Table view"
            >
              <List className={cn("h-4 w-4", viewMode === "table" && getAccentTextClass())} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn("h-7 px-2", viewMode === "cards" && getAccentBgClass())}
              onClick={() => setViewMode("cards")}
              title="Cards view"
            >
              <LayoutGrid className={cn("h-4 w-4", viewMode === "cards" && getAccentTextClass())} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn("h-7 px-2", viewMode === "kanban" && getAccentBgClass())}
              onClick={() => setViewMode("kanban")}
              title="Kanban view"
            >
              <Kanban className={cn("h-4 w-4", viewMode === "kanban" && getAccentTextClass())} />
            </Button>
          </div>

          {/* Spacer to push create and download to the right */}
          <div className="flex-1" />

          {/* Create Contact Button */}
          <Button size="sm" className={cn("gap-2 h-8", getAccentClass())} onClick={onCreateContact}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create Contact</span>
          </Button>

          {/* Download/Quick Action Button */}
          <Button variant="outline" size="sm" className="h-8 w-8 p-0" title="Download">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(activeFilters.length > 0 || typeFilter !== "all") && (
        <div className="px-4 py-2 border-b border-border flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {typeFilter !== "all" && (
            <Badge variant="secondary" className="gap-1 text-xs">
              Type: {typeFilter}
              <button onClick={() => setTypeFilter("all")} className="ml-1 hover:text-foreground">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="gap-1 text-xs">
              {filterFields.find((f) => f.id === filter.field)?.label}: {filter.value}
              <button onClick={() => removeFilter(index)} className="ml-1 hover:text-foreground">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={clearAllFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Type Tabs */}
      <div className="flex px-4 py-2 gap-1 border-b border-border overflow-x-auto">
        {typeTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTypeFilter(tab.id)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
              typeFilter === tab.id
                ? cn(getAccentBgClass(), getAccentTextClass())
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Quick Actions Bar - Shown when contacts are selected */}
      {selectedRows.size > 0 && (
        <div className="px-4 py-2 border-b border-border bg-muted/30 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {selectedRows.size} contact{selectedRows.size > 1 ? "s" : ""} selected
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-8 text-xs"
              title="Export as CSV"
              onClick={() => {
                const selected = Array.from(selectedRows).map(id => 
                  filteredContacts.find(c => c.id === id)
                ).filter(Boolean) as Contact[]
                exportToCSV(selected)
              }}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">CSV</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-8 text-xs"
              title="Export as PDF"
              onClick={() => {
                const selected = Array.from(selectedRows).map(id => 
                  filteredContacts.find(c => c.id === id)
                ).filter(Boolean) as Contact[]
                exportToPDF(selected)
              }}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">PDF</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-8 text-xs"
              title="Print"
              onClick={() => {
                const selected = Array.from(selectedRows).map(id => 
                  filteredContacts.find(c => c.id === id)
                ).filter(Boolean) as Contact[]
                printContacts(selected)
              }}
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <div className="w-px h-6 bg-border" />
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-8 text-xs"
              title="Archive"
              onClick={() => {
                const selected = Array.from(selectedRows).map(id => 
                  filteredContacts.find(c => c.id === id)
                ).filter(Boolean) as Contact[]
                archiveContacts(selected)
                setSelectedRows(new Set())
              }}
            >
              <Archive className="h-4 w-4" />
              <span className="hidden sm:inline">Archive</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
              title="Delete"
              onClick={() => {
                if (confirm(`Are you sure you want to delete ${selectedRows.size} contact${selectedRows.size > 1 ? "s" : ""}?`)) {
                  const selected = Array.from(selectedRows).map(id => 
                    filteredContacts.find(c => c.id === id)
                  ).filter(Boolean) as Contact[]
                  deleteContacts(selected)
                  setSelectedRows(new Set())
                }
              }}
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {viewMode === "table" && (
          <TableView
            contacts={filteredContacts}
            columns={visibleColumns}
            selectedContactId={selectedContactId}
            selectedRows={selectedRows}
            onRowClick={onRowClick}
            onEdit={onEdit}
            toggleRow={toggleRow}
            toggleAll={toggleAll}
            colorTheme={colorTheme}
          />
        )}
        {viewMode === "cards" && (
          <CardsView
            contacts={filteredContacts}
            selectedContactId={selectedContactId}
            onRowClick={onRowClick}
            onEdit={onEdit}
            colorTheme={colorTheme}
          />
        )}
        {viewMode === "kanban" && (
          <KanbanView
            contacts={filteredContacts}
            selectedContactId={selectedContactId}
            onRowClick={onRowClick}
            onEdit={onEdit}
            colorTheme={colorTheme}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Total: <span className="font-semibold text-foreground">{filteredContacts.length} contacts</span>
          {selectedRows.size > 0 && (
            <span className="ml-2">({selectedRows.size} selected)</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {editingPageRange ? (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-950">
              <label className="text-xs font-semibold text-foreground">Range:</label>
              <Input
                type="text"
                value={pageRangeInput}
                onChange={(e) => setPageRangeInput(e.target.value)}
                placeholder="1-10"
                className="w-20 h-8 text-sm font-semibold border-blue-300"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const match = pageRangeInput.match(/(\d+)-(\d+)/)
                    if (match) {
                      const start = parseInt(match[1])
                      const end = parseInt(match[2])
                      if (start > 0 && end >= start && end <= filteredContacts.length) {
                        setPageSize(end - start + 1)
                        setCurrentPage(1)
                      }
                    }
                    setEditingPageRange(false)
                  } else if (e.key === "Escape") {
                    setEditingPageRange(false)
                  }
                }}
              />
              <Button
                size="sm"
                className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  const match = pageRangeInput.match(/(\d+)-(\d+)/)
                  if (match) {
                    const start = parseInt(match[1])
                    const end = parseInt(match[2])
                    if (start > 0 && end >= start && end <= filteredContacts.length) {
                      setPageSize(end - start + 1)
                      setCurrentPage(1)
                    }
                  }
                  setEditingPageRange(false)
                }}
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-3"
                onClick={() => setEditingPageRange(false)}
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
              className="px-4 py-2 rounded-lg border border-border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all cursor-pointer font-semibold text-foreground"
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
          ) : (
            <button
              onClick={() => {
                setPageRangeInput(`1-${Math.min(pageSize, filteredContacts.length)}`)
                setEditingPageRange(true)
              }}
              className="px-3 py-1.5 rounded-lg border border-border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all cursor-pointer font-semibold text-foreground"
            >
              {Math.max(1, 1)}-{Math.min(pageSize, filteredContacts.length)} of {filteredContacts.length}
            </button>
          )}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Table View Component
function TableView({
  contacts,
  columns,
  selectedContactId,
  selectedRows,
  onRowClick,
  onEdit,
  toggleRow,
  toggleAll,
  colorTheme,
}: {
  contacts: Contact[]
  columns: ColumnDef[]
  selectedContactId?: string
  selectedRows: Set<string>
  onRowClick: (contact: Contact) => void
  onEdit: (contact: Contact) => void
  toggleRow: (id: string, e: React.MouseEvent) => void
  toggleAll: () => void
  colorTheme: ColorTheme
}) {
  const getAccentBorderClass = () => {
    switch (colorTheme) {
      case "orange": return "border-l-orange-500"
      case "navy": return "border-l-blue-700"
      default: return "border-l-slate-600"
    }
  }

  const getAccentTextClass = () => {
    switch (colorTheme) {
      case "orange": return "text-orange-600"
      case "navy": return "text-blue-700"
      default: return "text-slate-700"
    }
  }

  return (
    <table className="w-full text-left border-collapse min-w-[900px]">
      <thead className="sticky top-0 bg-muted/50 z-10">
        <tr className="text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
          <th className="px-4 py-3 w-10">
            <Checkbox
              checked={selectedRows.size === contacts.length && contacts.length > 0}
              onCheckedChange={toggleAll}
            />
          </th>
          {columns.map((col) => (
            <th key={col.id} className="px-4 py-3" style={col.width ? { width: col.width } : undefined}>
              {col.label}
            </th>
          ))}
          <th className="px-4 py-3 w-10"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border text-sm">
        {contacts.map((contact) => {
          const isSelected = selectedContactId === contact.id
          const isChecked = selectedRows.has(contact.id)
          const typeCfg = contact.type ? contactTypeConfig[contact.type] : null
          const statusCfg = contact.status ? contactStatusConfig[contact.status] : null

          return (
            <tr
              key={contact.id}
              onClick={() => onRowClick(contact)}
              className={cn(
                "cursor-pointer transition-colors",
                isSelected
                  ? cn("bg-muted/50", getAccentBorderClass(), "border-l-4")
                  : "hover:bg-muted/30 border-l-4 border-l-transparent"
              )}
            >
              <td className="px-4 py-3">
                <Checkbox
                  checked={isChecked}
                  onClick={(e) => toggleRow(contact.id, e)}
                />
              </td>
              {columns.map((col) => (
                <td key={col.id} className="px-4 py-3">
                  {col.id === "name" && (
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                        {contact.initials}
                      </div>
                      <div>
                        <span className={cn("font-semibold", isSelected && getAccentTextClass())}>{contact.name}</span>
                        {(contact.customerRank ?? 0) >= 4 && (
                          <Star className="inline h-3 w-3 ml-1 text-amber-500 fill-amber-500" />
                        )}
                      </div>
                    </div>
                  )}
                  {col.id === "email" && <span className="text-muted-foreground">{contact.email}</span>}
                  {col.id === "phone" && <span className="text-muted-foreground">{contact.phone}</span>}
                  {col.id === "location" && (
                    <span className="text-muted-foreground">
                      {contact.city && contact.country ? `${contact.city}, ${contact.country}` : contact.country || "-"}
                    </span>
                  )}
                  {col.id === "type" && typeCfg && (
                    <span className={cn("px-2 py-1 rounded-full text-[10px] font-bold", typeCfg.className)}>
                      {typeCfg.label.toUpperCase()}
                    </span>
                  )}
                  {col.id === "status" && statusCfg && (
                    <span className={cn("px-2 py-1 rounded-full text-[10px] font-bold", statusCfg.className)}>
                      {statusCfg.label.toUpperCase()}
                    </span>
                  )}
                  {col.id === "industry" && <span className="text-muted-foreground">{contact.industry || "-"}</span>}
                  {col.id === "paymentTerms" && <span className="text-muted-foreground">{contact.paymentTerms || "-"}</span>}
                  {col.id === "currency" && <span className="text-muted-foreground">{contact.currency || "-"}</span>}
                  {col.id === "tags" && (
                    <div className="flex gap-1 flex-wrap">
                      {contact.tags?.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                      {(contact.tags?.length ?? 0) > 2 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground">
                          +{(contact.tags?.length ?? 0) - 2}
                        </span>
                      )}
                    </div>
                  )}
                  {col.id === "createdAt" && (
                    <span className="text-muted-foreground">
                      {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : "-"}
                    </span>
                  )}
                </td>
              ))}
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
  )
}

// Cards View Component
function CardsView({
  contacts,
  selectedContactId,
  onRowClick,
  onEdit,
  colorTheme,
}: {
  contacts: Contact[]
  selectedContactId?: string
  onRowClick: (contact: Contact) => void
  onEdit: (contact: Contact) => void
  colorTheme: ColorTheme
}) {
  const getAccentBorderClass = () => {
    switch (colorTheme) {
      case "orange": return "border-orange-500"
      case "navy": return "border-blue-700"
      default: return "border-slate-600"
    }
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {contacts.map((contact) => {
        const isSelected = selectedContactId === contact.id
        const typeCfg = contact.type ? contactTypeConfig[contact.type] : null
        const statusCfg = contact.status ? contactStatusConfig[contact.status] : null

        return (
          <div
            key={contact.id}
            onClick={() => onRowClick(contact)}
            className={cn(
              "bg-card border rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg",
              isSelected ? cn("border-2", getAccentBorderClass(), "shadow-md") : "border-border hover:border-muted-foreground/30"
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-xl bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                  {contact.initials}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground flex items-center gap-1">
                    {contact.name}
                    {(contact.customerRank ?? 0) >= 4 && (
                      <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    )}
                  </h3>
                  {typeCfg && (
                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", typeCfg.className)}>
                      {typeCfg.label}
                    </span>
                  )}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(contact); }}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                <span className="truncate">{contact.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                <span>{contact.phone}</span>
              </div>
              {(contact.city || contact.country) && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{contact.city ? `${contact.city}, ` : ""}{contact.country}</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
              {statusCfg && (
                <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", statusCfg.className)}>
                  {statusCfg.label}
                </span>
              )}
              <div className="flex gap-1">
                {contact.tags?.slice(0, 2).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Kanban View Component
function KanbanView({
  contacts,
  selectedContactId,
  onRowClick,
  onEdit,
  colorTheme,
}: {
  contacts: Contact[]
  selectedContactId?: string
  onRowClick: (contact: Contact) => void
  onEdit: (contact: Contact) => void
  colorTheme: ColorTheme
}) {
  const getAccentBorderClass = () => {
    switch (colorTheme) {
      case "orange": return "border-orange-500"
      case "navy": return "border-blue-700"
      default: return "border-slate-600"
    }
  }

  const columns = [
    { id: "prospect", label: "Prospects", color: "bg-amber-500" },
    { id: "active", label: "Active", color: "bg-green-500" },
    { id: "inactive", label: "Inactive", color: "bg-slate-400" },
  ]

  return (
    <div className="p-4 flex gap-4 h-full overflow-x-auto">
      {columns.map((column) => {
        const columnContacts = contacts.filter((c) => c.status === column.id)
        
        return (
          <div key={column.id} className="flex-shrink-0 w-[320px] flex flex-col">
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-3 px-2">
              <div className={cn("w-3 h-3 rounded-full", column.color)} />
              <h3 className="font-semibold text-sm">{column.label}</h3>
              <Badge variant="secondary" className="ml-auto">
                {columnContacts.length}
              </Badge>
            </div>

            {/* Column Content */}
            <div className="flex-1 bg-muted/30 rounded-xl p-2 space-y-2 overflow-y-auto">
              {columnContacts.map((contact) => {
                const isSelected = selectedContactId === contact.id
                const typeCfg = contact.type ? contactTypeConfig[contact.type] : null

                return (
                  <div
                    key={contact.id}
                    onClick={() => onRowClick(contact)}
                    className={cn(
                      "bg-card border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md",
                      isSelected ? cn("border-2", getAccentBorderClass()) : "border-border"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="size-10 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                        {contact.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate flex items-center gap-1">
                          {contact.name}
                          {(contact.customerRank ?? 0) >= 4 && (
                            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                          )}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate">{contact.email}</p>
                        {typeCfg && (
                          <span className={cn("inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold", typeCfg.className)}>
                            {typeCfg.label}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {contact.tags && contact.tags.length > 0 && (
                      <div className="mt-2 flex gap-1 flex-wrap">
                        {contact.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-muted text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}

              {columnContacts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No contacts
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Helper functions for quick actions
function exportToCSV(contacts: Contact[]) {
  if (contacts.length === 0) return
  
  const headers = ["Name", "Email", "Phone", "Country", "City", "Type", "Status", "Industry"]
  const rows = contacts.map(c => [
    c.name,
    c.email,
    c.phone,
    c.country || "",
    c.city || "",
    c.type || "",
    c.status || "",
    c.industry || "",
  ])
  
  const csvContent = [
    headers.join(","),
    ...rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
  ].join("\n")
  
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = `contacts_${new Date().toISOString().split("T")[0]}.csv`
  link.click()
}

function exportToPDF(contacts: Contact[]) {
  if (contacts.length === 0) return
  
  const doc = document.createElement("div")
  doc.innerHTML = `
    <style>
      body { font-family: Arial, sans-serif; }
      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
      th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
      th { background-color: #f2f2f2; font-weight: bold; }
      h1 { color: #333; }
    </style>
    <h1>Contacts Report</h1>
    <p>Generated on ${new Date().toLocaleDateString()}</p>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Country</th>
          <th>City</th>
          <th>Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${contacts.map(c => `
          <tr>
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.phone}</td>
            <td>${c.country || "-"}</td>
            <td>${c.city || "-"}</td>
            <td>${c.type || "-"}</td>
            <td>${c.status || "-"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `
  
  const newWindow = window.open("", "", "width=800,height=600")
  if (newWindow) {
    newWindow.document.write(doc.innerHTML)
    newWindow.document.close()
    setTimeout(() => newWindow.print(), 250)
  }
}

function printContacts(contacts: Contact[]) {
  if (contacts.length === 0) return
  
  const doc = document.createElement("div")
  doc.innerHTML = `
    <style>
      @media print {
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 10px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
      }
    </style>
    <h2>Contacts List</h2>
    <p>Printed on ${new Date().toLocaleDateString()}</p>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Location</th>
          <th>Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${contacts.map(c => `
          <tr>
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.phone}</td>
            <td>${c.city ? c.city + (c.country ? ", " + c.country : "") : c.country || "-"}</td>
            <td>${c.type || "-"}</td>
            <td>${c.status || "-"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `
  
  const newWindow = window.open("", "", "width=800,height=600")
  if (newWindow) {
    newWindow.document.write(doc.innerHTML)
    newWindow.document.close()
    setTimeout(() => newWindow.print(), 250)
  }
}

function archiveContacts(contacts: Contact[]) {
  console.log("[v0] Archiving", contacts.length, "contact(s)")
  // TODO: Implement archive functionality - update contact status in database
}

function deleteContacts(contacts: Contact[]) {
  console.log("[v0] Deleting", contacts.length, "contact(s)")
  // TODO: Implement delete functionality - remove contacts from database
}
