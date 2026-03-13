// ERP Types

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  initials: string
  type?: "customer" | "supplier" | "both"
  country?: string
  city?: string
  address?: string
  paymentTerms?: string
  currency?: string
  customerRank?: number
  supplierRank?: number
  tags?: string[]
  createdAt?: string
  updatedAt?: string
  status?: "active" | "inactive" | "prospect"
  industry?: string
  website?: string
  
  // Tax & Compliance
  ice?: string
  vatSubject?: boolean
  vatNumber?: string
  taxRegime?: 'foret' | 'real' | 'simplified'
  isExport?: boolean
  isSuspended?: boolean
  isProvisional?: boolean
  
  // Address Fields
  postalCode?: string
  quartier?: string
  region?: string
  mobile?: string
  
  // Financial
  creditLimit?: number
  isCreditAllowed?: boolean
}

export const contactStatusConfig = {
  active: {
    label: "Active",
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  inactive: {
    label: "Inactive",
    className: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
  prospect: {
    label: "Prospect",
    className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
}

export interface OrderLine {
  id: string
  product: string
  quantity: number
  unitPrice: number
  discount?: number
  tax?: number
  total: number
}

export interface SalesOrder {
  id: string
  customer: Contact
  date: string
  total: number
  currency: string
  status: "draft" | "confirmed" | "to_invoice" | "invoiced" | "cancelled"
  paymentTerms: string
  warehouse: string
  salesperson: string
  lines: OrderLine[]
  notes?: string
  deliveryDate?: string
}

export type StatusConfig = {
  label: string
  className: string
}

export const salesStatusConfig: Record<SalesOrder["status"], StatusConfig> = {
  draft: {
    label: "DRAFT",
    className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  confirmed: {
    label: "CONFIRMED",
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  to_invoice: {
    label: "TO INVOICE",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  invoiced: {
    label: "INVOICED",
    className: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
  },
  cancelled: {
    label: "CANCELLED",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
}

export const contactTypeConfig = {
  customer: {
    label: "Customer",
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  supplier: {
    label: "Supplier",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  both: {
    label: "Customer & Supplier",
    className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
}
