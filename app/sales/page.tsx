"use client"

import * as React from "react"
import { ERPHeader } from "@/components/erp-header"
import { SalesOrdersTable } from "@/components/sales/sales-orders-table"
import { SalesOrderPanel } from "@/components/sales/sales-order-panel"
import { SalesOrderEditPanel } from "@/components/sales/sales-order-edit-panel"
import type { SalesOrder } from "@/lib/types"

// Sample data
const sampleOrders: SalesOrder[] = [
  {
    id: "SO-2024-001",
    customer: { id: "c1", name: "Global Industries Ltd.", email: "contact@globalind.com", phone: "+1 (555) 012-3456", initials: "GI" },
    date: "2024-10-25",
    total: 12450.0,
    currency: "USD",
    status: "confirmed",
    paymentTerms: "Net 30 Days",
    warehouse: "Main Warehouse",
    salesperson: "Mark Spencer",
    lines: [
      { id: "l1", product: "Workstation Pro Z1", quantity: 2, unitPrice: 2500.0, total: 5000.0 },
      { id: "l2", product: "4K Monitor 32\"", quantity: 4, unitPrice: 800.0, total: 3200.0 },
      { id: "l3", product: "Support Package", quantity: 1, unitPrice: 4250.0, total: 4250.0 },
    ],
  },
  {
    id: "SO-2024-002",
    customer: { id: "c2", name: "Apex Solutions", email: "orders@apex.com", phone: "+1 (555) 234-5678", initials: "AS" },
    date: "2024-10-26",
    total: 4200.0,
    currency: "USD",
    status: "draft",
    paymentTerms: "Immediate",
    warehouse: "Main Warehouse",
    salesperson: "Sarah Kim",
    lines: [
      { id: "l4", product: "Server Rack Unit", quantity: 1, unitPrice: 3500.0, total: 3500.0 },
      { id: "l5", product: "Network Cable Bundle", quantity: 2, unitPrice: 350.0, total: 700.0 },
    ],
  },
  {
    id: "SO-2024-003",
    customer: { id: "c3", name: "Nova Technologies", email: "procurement@nova.tech", phone: "+1 (555) 345-6789", initials: "NT" },
    date: "2024-10-26",
    total: 890.5,
    currency: "USD",
    status: "confirmed",
    paymentTerms: "Net 15 Days",
    warehouse: "Secondary Warehouse",
    salesperson: "Mark Spencer",
    lines: [
      { id: "l6", product: "USB-C Hub Pro", quantity: 5, unitPrice: 89.0, total: 445.0 },
      { id: "l7", product: "Wireless Mouse", quantity: 10, unitPrice: 44.55, total: 445.5 },
    ],
  },
  {
    id: "SO-2024-004",
    customer: { id: "c4", name: "Zenith Manufacturing", email: "supply@zenith.com", phone: "+1 (555) 456-7890", initials: "ZM" },
    date: "2024-10-27",
    total: 25600.0,
    currency: "USD",
    status: "invoiced",
    paymentTerms: "Net 30 Days",
    warehouse: "Main Warehouse",
    salesperson: "James Wilson",
    lines: [
      { id: "l8", product: "Industrial Printer X500", quantity: 2, unitPrice: 8500.0, total: 17000.0 },
      { id: "l9", product: "Maintenance Contract 1Y", quantity: 2, unitPrice: 4300.0, total: 8600.0 },
    ],
  },
  {
    id: "SO-2024-005",
    customer: { id: "c5", name: "Metro Systems Inc.", email: "orders@metrosys.com", phone: "+1 (555) 567-8901", initials: "MS" },
    date: "2024-10-28",
    total: 7850.0,
    currency: "USD",
    status: "to_invoice",
    paymentTerms: "Net 30 Days",
    warehouse: "Main Warehouse",
    salesperson: "Sarah Kim",
    lines: [
      { id: "l10", product: "Laptop Stand Elite", quantity: 25, unitPrice: 120.0, total: 3000.0 },
      { id: "l11", product: "Ergonomic Keyboard", quantity: 25, unitPrice: 180.0, total: 4500.0 },
      { id: "l12", product: "Shipping & Handling", quantity: 1, unitPrice: 350.0, total: 350.0 },
    ],
  },
  {
    id: "SO-2024-006",
    customer: { id: "c6", name: "Pacific Trading Co.", email: "buy@pacific.co", phone: "+1 (555) 678-9012", initials: "PT" },
    date: "2024-10-29",
    total: 3200.0,
    currency: "USD",
    status: "cancelled",
    paymentTerms: "Net 15 Days",
    warehouse: "Main Warehouse",
    salesperson: "Mark Spencer",
    lines: [
      { id: "l13", product: "Office Chair Pro", quantity: 8, unitPrice: 400.0, total: 3200.0 },
    ],
  },
]

export default function SalesPage() {
  const [selectedOrder, setSelectedOrder] = React.useState<SalesOrder | null>(null)
  const [editingOrder, setEditingOrder] = React.useState<SalesOrder | null>(null)
  const [orders, setOrders] = React.useState(sampleOrders)
  const [statusFilter, setStatusFilter] = React.useState<string>("all")

  const filteredOrders = React.useMemo(() => {
    if (statusFilter === "all") return orders
    return orders.filter((o) => o.status === statusFilter)
  }, [orders, statusFilter])

  const handleRowClick = (order: SalesOrder) => {
    setSelectedOrder(order)
    setEditingOrder(null)
  }

  const handleEdit = (order: SalesOrder) => {
    setEditingOrder(order)
    setSelectedOrder(null)
  }

  const handleClosePanel = () => {
    setSelectedOrder(null)
  }

  const handleCloseEditPanel = () => {
    setEditingOrder(null)
  }

  const handleSaveOrder = (updatedOrder: SalesOrder) => {
    setOrders((prev) => prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)))
    setEditingOrder(null)
    setSelectedOrder(updatedOrder)
  }

  return (
    <div className="min-h-screen bg-background">
      <ERPHeader />
      <main className="flex h-[calc(100vh-7rem)]">
        {/* Main Table Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <SalesOrdersTable
            orders={filteredOrders}
            selectedOrderId={selectedOrder?.id || editingOrder?.id}
            onRowClick={handleRowClick}
            onEdit={handleEdit}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            totalOrders={orders.length}
          />
        </div>

        {/* Preview Panel */}
        {selectedOrder && (
          <SalesOrderPanel
            order={selectedOrder}
            onClose={handleClosePanel}
            onEdit={() => handleEdit(selectedOrder)}
          />
        )}

        {/* Edit Panel */}
        {editingOrder && (
          <SalesOrderEditPanel
            order={editingOrder}
            onClose={handleCloseEditPanel}
            onSave={handleSaveOrder}
          />
        )}
      </main>
    </div>
  )
}
