"use client"

import * as React from "react"
import { Search, Filter, Columns, Download, Plus, MoreVertical, ChevronLeft, ChevronRight, Edit, Trash2, Copy, Send } from "lucide-react"
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
import type { SalesOrder } from "@/lib/types"
import { salesStatusConfig } from "@/lib/types"

interface SalesOrdersTableProps {
  orders: SalesOrder[]
  selectedOrderId?: string
  onRowClick: (order: SalesOrder) => void
  onEdit: (order: SalesOrder) => void
  statusFilter: string
  onStatusFilterChange: (status: string) => void
  totalOrders: number
}

const statusTabs = [
  { id: "all", label: "All Orders" },
  { id: "draft", label: "Draft" },
  { id: "confirmed", label: "Confirmed" },
  { id: "to_invoice", label: "To Invoice" },
  { id: "invoiced", label: "Invoiced" },
  { id: "cancelled", label: "Cancelled" },
]

export function SalesOrdersTable({
  orders,
  selectedOrderId,
  onRowClick,
  onEdit,
  statusFilter,
  onStatusFilterChange,
  totalOrders,
}: SalesOrdersTableProps) {
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredOrders = React.useMemo(() => {
    if (!searchQuery) return orders
    const query = searchQuery.toLowerCase()
    return orders.filter(
      (o) =>
        o.id.toLowerCase().includes(query) ||
        o.customer.name.toLowerCase().includes(query) ||
        o.salesperson.toLowerCase().includes(query)
    )
  }, [orders, searchQuery])

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
    if (selectedRows.size === filteredOrders.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(filteredOrders.map((o) => o.id)))
    }
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Table Header / Actions */}
      <div className="p-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[300px]">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search orders, customers..."
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
            Create Order
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex px-4 py-2 gap-1 border-b border-border overflow-x-auto">
        {statusTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onStatusFilterChange(tab.id)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
              statusFilter === tab.id
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
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="sticky top-0 bg-muted/50 z-10">
            <tr className="text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
              <th className="px-4 py-3 w-10">
                <Checkbox
                  checked={selectedRows.size === filteredOrders.length && filteredOrders.length > 0}
                  onCheckedChange={toggleAll}
                />
              </th>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {filteredOrders.map((order) => {
              const isSelected = selectedOrderId === order.id
              const isChecked = selectedRows.has(order.id)
              const statusCfg = salesStatusConfig[order.status]

              return (
                <tr
                  key={order.id}
                  onClick={() => onRowClick(order)}
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
                      onClick={(e) => toggleRow(order.id, e)}
                    />
                  </td>
                  <td className={cn("px-4 py-3 font-bold", isSelected ? "text-accent" : "text-foreground")}>
                    {order.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                        {order.customer.initials}
                      </div>
                      <span>{order.customer.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(order.date)}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatCurrency(order.total, order.currency)}</td>
                  <td className="px-4 py-3">
                    <span className={cn("px-2 py-1 rounded-full text-[10px] font-bold", statusCfg.className)}>
                      {statusCfg.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(order); }}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Send className="mr-2 h-4 w-4" />
                          Send by Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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
          Total: <span className="font-semibold text-foreground">{totalOrders.toLocaleString()} orders</span>
        </div>
        <div className="flex items-center gap-4">
          <span>1-{Math.min(25, filteredOrders.length)} of {filteredOrders.length}</span>
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
