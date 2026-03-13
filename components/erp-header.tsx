"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Users,
  Package,
  ShoppingCart,
  Truck,
  Warehouse,
  Calculator,
  CreditCard,
  Settings,
  Bell,
  Plus,
  Search,
  Menu,
  X,
  ChevronDown,
  Building2,
  FileText,
  UserCircle,
  BarChart3,
  Cog,
  ListOrdered,
  ClipboardList,
  Receipt,
  Wallet,
  ArrowLeftRight,
  BookOpen,
  DollarSign,
  TrendingUp,
  UserCog,
  Shield,
  Database,
  Globe,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

// Sub-item type
interface SubItem {
  label: string
  href: string
  icon: LucideIcon
}

// Module type with children as the submenu
interface Module {
  id: string
  label: string
  icon: LucideIcon
  href: string
  children: SubItem[]
}

// Module configuration - children ARE the horizontal submenu items
const modules: Module[] = [
  {
    id: "contacts",
    label: "Contacts",
    icon: Users,
    href: "/contacts",
    children: [
      { label: "Customers", href: "/contacts/customers", icon: Users },
      { label: "Suppliers", href: "/contacts/suppliers", icon: Truck },
      { label: "All Contacts", href: "/contacts", icon: UserCircle },
      { label: "Configuration", href: "/contacts/config", icon: Cog },
    ],
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
    href: "/products",
    children: [
      { label: "Catalog", href: "/products/catalog", icon: Package },
      { label: "Categories", href: "/products/categories", icon: ListOrdered },
      { label: "Price Lists", href: "/products/pricelists", icon: DollarSign },
      { label: "Configuration", href: "/products/config", icon: Cog },
    ],
  },
  {
    id: "sales",
    label: "Sales",
    icon: ShoppingCart,
    href: "/sales",
    children: [
      { label: "Quotations", href: "/sales/quotations", icon: FileText },
      { label: "Orders", href: "/sales", icon: ClipboardList },
      { label: "Customers", href: "/sales/customers", icon: Users },
      { label: "Reports", href: "/sales/reports", icon: BarChart3 },
      { label: "Configuration", href: "/sales/config", icon: Cog },
    ],
  },
  {
    id: "purchases",
    label: "Purchases",
    icon: Truck,
    href: "/purchases",
    children: [
      { label: "RFQs", href: "/purchases/rfqs", icon: FileText },
      { label: "Purchase Orders", href: "/purchases/orders", icon: ClipboardList },
      { label: "Vendors", href: "/purchases/vendors", icon: Users },
      { label: "Reports", href: "/purchases/reports", icon: BarChart3 },
      { label: "Configuration", href: "/purchases/config", icon: Cog },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: Warehouse,
    href: "/inventory",
    children: [
      { label: "Stock", href: "/inventory/stock", icon: Package },
      { label: "Transfers", href: "/inventory/transfers", icon: ArrowLeftRight },
      { label: "Warehouses", href: "/inventory/warehouses", icon: Warehouse },
      { label: "Reports", href: "/inventory/reports", icon: BarChart3 },
      { label: "Configuration", href: "/inventory/config", icon: Cog },
    ],
  },
  {
    id: "accounting",
    label: "Accounting",
    icon: Calculator,
    href: "/accounting",
    children: [
      { label: "Invoices", href: "/accounting/invoices", icon: Receipt },
      { label: "Bills", href: "/accounting/bills", icon: FileText },
      { label: "Journal Entries", href: "/accounting/journal", icon: BookOpen },
      { label: "Chart of Accounts", href: "/accounting/accounts", icon: ListOrdered },
      { label: "Reports", href: "/accounting/reports", icon: BarChart3 },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
    href: "/payments",
    children: [
      { label: "Payments", href: "/payments/list", icon: Wallet },
      { label: "Reconciliation", href: "/payments/reconciliation", icon: ArrowLeftRight },
      { label: "Reports", href: "/payments/reports", icon: TrendingUp },
      { label: "Configuration", href: "/payments/config", icon: Cog },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/settings",
    children: [
      { label: "Users", href: "/settings/users", icon: UserCog },
      { label: "Roles & Permissions", href: "/settings/roles", icon: Shield },
      { label: "Company", href: "/settings/company", icon: Building2 },
      { label: "Data Import", href: "/settings/import", icon: Database },
      { label: "Localization", href: "/settings/localization", icon: Globe },
    ],
  },
]

export function ERPHeader() {
  const pathname = usePathname()
  const [hoveredModule, setHoveredModule] = React.useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [mobileExpandedModule, setMobileExpandedModule] = React.useState<string | null>(null)

  // Determine active module from pathname
  const activeModule = React.useMemo(() => {
    const found = modules.find((m) => pathname.startsWith(m.href))
    return found?.id || null
  }, [pathname])

  const activeModuleData = modules.find((m) => m.id === activeModule)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        {/* Primary Navigation Bar */}
        <div className="flex h-14 items-center px-4 gap-4 bg-primary text-primary-foreground">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent">
              <Building2 className="h-5 w-5 text-accent-foreground" />
            </div>
            <span className="font-semibold text-lg">Nexus ERP</span>
          </Link>

          {/* Module Navigation - Horizontal */}
          <nav className="flex items-center gap-1 flex-1 ml-6">
            {modules.map((module) => {
              const isActive = activeModule === module.id
              const isHovered = hoveredModule === module.id
              const Icon = module.icon

              return (
                <div
                  key={module.id}
                  className="relative"
                  onMouseEnter={() => setHoveredModule(module.id)}
                  onMouseLeave={() => setHoveredModule(null)}
                >
                  <Link
                    href={module.href}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-primary-foreground/15 text-primary-foreground"
                        : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{module.label}</span>
                    {module.children.length > 0 && (
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 transition-transform",
                          isHovered && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Horizontal Children Dropdown - derived from module.children */}
                  {module.children.length > 0 && isHovered && (
                    <div className="absolute top-full left-0 mt-1 z-50">
                      <div className="bg-popover border border-border rounded-lg shadow-lg p-2 min-w-max">
                        {/* Horizontal submenu - showing children */}
                        <div className="flex items-center gap-1">
                          {module.children.map((child) => {
                            const ChildIcon = child.icon
                            const isChildActive = pathname === child.href
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "flex items-center gap-1.5 px-3 py-2 text-sm rounded-md transition-colors whitespace-nowrap",
                                  isChildActive
                                    ? "bg-accent text-accent-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                              >
                                <ChildIcon className="h-4 w-4" />
                                <span>{child.label}</span>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Global Search */}
            <Button variant="secondary" size="sm" className="w-[180px] justify-start bg-primary-foreground/10 border-0 text-primary-foreground/70 hover:bg-primary-foreground/15 hover:text-primary-foreground">
              <Search className="h-4 w-4 mr-2" />
              <span>Search...</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-primary-foreground/20 bg-primary-foreground/10 px-1.5 font-mono text-[10px] font-medium text-primary-foreground/70">
                ⌘K
              </kbd>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground font-bold">
                3
              </span>
              <span className="sr-only">Notifications</span>
            </Button>

            {/* Quick Create */}
            <Button variant="ghost" size="icon" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <Plus className="h-5 w-5" />
              <span className="sr-only">Create new</span>
            </Button>

            {/* Divider */}
            <div className="h-6 w-px bg-primary-foreground/20 mx-1" />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2 text-primary-foreground hover:bg-primary-foreground/10">
                  <Avatar className="h-8 w-8 border border-primary-foreground/20">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="bg-accent text-accent-foreground text-xs">JD</AvatarFallback>
                  </Avatar>
                  <div className="hidden xl:flex flex-col items-start">
                    <span className="text-sm font-medium">John Doe</span>
                    <span className="text-[10px] text-primary-foreground/60">Administrator</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-primary-foreground/60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <UserCircle className="mr-2 h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Building2 className="mr-2 h-4 w-4" />
                  Switch Company
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Secondary Navigation - Module Children (Horizontal Tab Bar) */}
        {activeModuleData && activeModuleData.children.length > 0 && (
          <div className="border-b border-border bg-card">
            <div className="flex items-center gap-1 px-4 h-11 overflow-x-auto">
              <div className="flex items-center gap-2 pr-4 mr-4 border-r border-border">
                {React.createElement(activeModuleData.icon, { className: "h-4 w-4 text-accent" })}
                <span className="text-sm font-semibold text-foreground whitespace-nowrap">{activeModuleData.label} Module</span>
              </div>
              {activeModuleData.children.map((child) => {
                const ChildIcon = child.icon
                const isChildActive = pathname === child.href
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                      isChildActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <ChildIcon className="h-4 w-4" />
                    <span>{child.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Mobile/Tablet Navigation */}
      <div className="lg:hidden flex h-14 items-center px-4 gap-4 bg-primary text-primary-foreground">
        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent">
                    <Building2 className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <span className="font-semibold text-lg">Nexus ERP</span>
                </Link>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10" onClick={() => setMobileOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 overflow-y-auto p-4 bg-background">
                <div className="flex flex-col gap-1">
                  {modules.map((module) => {
                    const isActive = activeModule === module.id
                    const isExpanded = mobileExpandedModule === module.id
                    const Icon = module.icon

                    return (
                      <div key={module.id}>
                        <button
                          onClick={() =>
                            setMobileExpandedModule(isExpanded ? null : module.id)
                          }
                          className={cn(
                            "flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                            isActive
                              ? "bg-accent/10 text-accent"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5" />
                            <span>{module.label}</span>
                          </div>
                          {module.children.length > 0 && (
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform",
                                isExpanded && "rotate-180"
                              )}
                            />
                          )}
                        </button>

                        {/* Mobile Children - Vertical list derived from module.children */}
                        {isExpanded && module.children.length > 0 && (
                          <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l-2 border-border pl-3">
                            {module.children.map((child) => {
                              const ChildIcon = child.icon
                              const isChildActive = pathname === child.href
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className={cn(
                                    "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                                    isChildActive
                                      ? "bg-accent/10 text-accent"
                                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                  )}
                                >
                                  <ChildIcon className="h-4 w-4" />
                                  <span>{child.label}</span>
                                </Link>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </nav>

              {/* Mobile User Section */}
              <div className="p-4 border-t border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="bg-accent text-accent-foreground">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">John Doe</p>
                    <p className="text-xs text-muted-foreground truncate">john@company.com</p>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo - Centered on Mobile */}
        <Link href="/" className="flex items-center gap-2 flex-1 justify-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent">
            <Building2 className="h-5 w-5 text-accent-foreground" />
          </div>
          <span className="font-semibold">Nexus ERP</span>
        </Link>

        {/* Mobile Right Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground font-bold">
              3
            </span>
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
