"use client"

import * as React from "react"
import Link from "next/link"
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

// Module configuration with sub-navigation items
const modules = [
  {
    id: "contacts",
    label: "Contacts",
    icon: Users,
    href: "/contacts",
    subItems: [
      { label: "Customers", href: "/contacts/customers", icon: Users },
      { label: "Suppliers", href: "/contacts/suppliers", icon: Truck },
      { label: "All Contacts", href: "/contacts/all", icon: UserCircle },
      { label: "Configuration", href: "/contacts/config", icon: Cog },
    ],
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
    href: "/products",
    subItems: [
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
    subItems: [
      { label: "Quotations", href: "/sales/quotations", icon: FileText },
      { label: "Orders", href: "/sales/orders", icon: ClipboardList },
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
    subItems: [
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
    subItems: [
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
    subItems: [
      { label: "Invoices", href: "/accounting/invoices", icon: Receipt },
      { label: "Bills", href: "/accounting/bills", icon: FileText },
      { label: "Journal Entries", href: "/accounting/journal", icon: BookOpen },
      { label: "Chart of Accounts", href: "/accounting/accounts", icon: ListOrdered },
      { label: "Reports", href: "/accounting/reports", icon: BarChart3 },
      { label: "Configuration", href: "/accounting/config", icon: Cog },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
    href: "/payments",
    subItems: [
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
    subItems: [
      { label: "Users", href: "/settings/users", icon: UserCog },
      { label: "Roles & Permissions", href: "/settings/roles", icon: Shield },
      { label: "Company", href: "/settings/company", icon: Building2 },
      { label: "Data Import", href: "/settings/import", icon: Database },
      { label: "Localization", href: "/settings/localization", icon: Globe },
    ],
  },
]

interface ERPHeaderProps {
  activeModule?: string
}

export function ERPHeader({ activeModule = "sales" }: ERPHeaderProps) {
  const [hoveredModule, setHoveredModule] = React.useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [mobileExpandedModule, setMobileExpandedModule] = React.useState<string | null>(null)

  const activeModuleData = modules.find((m) => m.id === activeModule)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        {/* Primary Navigation Bar */}
        <div className="flex h-14 items-center px-4 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 w-[180px]">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">Enterprise</span>
          </Link>

          {/* Module Navigation - Horizontal */}
          <nav className="flex items-center gap-1 flex-1">
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
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{module.label}</span>
                    {module.subItems.length > 0 && (
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 transition-transform",
                          isHovered && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Horizontal Sub-Navigation Dropdown */}
                  {module.subItems.length > 0 && isHovered && (
                    <div className="absolute top-full left-0 mt-1 z-50">
                      <div className="bg-popover border border-border rounded-lg shadow-lg p-2 min-w-max">
                        {/* Horizontal submenu layout */}
                        <div className="flex items-center gap-1">
                          {module.subItems.map((subItem) => {
                            const SubIcon = subItem.icon
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors whitespace-nowrap"
                              >
                                <SubIcon className="h-4 w-4" />
                                <span>{subItem.label}</span>
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
            <Button variant="outline" size="sm" className="w-[200px] justify-start text-muted-foreground">
              <Search className="h-4 w-4 mr-2" />
              <span>Search...</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                ⌘K
              </kbd>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button>

            {/* Quick Create */}
            <Button variant="ghost" size="icon">
              <Plus className="h-5 w-5" />
              <span className="sr-only">Create new</span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden xl:inline-block">John Doe</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
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

        {/* Secondary Navigation - Module Sub-items (Tab Bar) */}
        {activeModuleData && activeModuleData.subItems.length > 0 && (
          <div className="border-t border-border bg-muted/30">
            <div className="flex items-center gap-1 px-4 h-10 overflow-x-auto">
              {activeModuleData.subItems.map((subItem) => {
                const SubIcon = subItem.icon
                return (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors whitespace-nowrap"
                  >
                    <SubIcon className="h-4 w-4" />
                    <span>{subItem.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Mobile/Tablet Navigation */}
      <div className="lg:hidden flex h-14 items-center px-4 gap-4">
        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                    <Building2 className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-semibold text-lg">Enterprise</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 overflow-y-auto p-4">
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
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5" />
                            <span>{module.label}</span>
                          </div>
                          {module.subItems.length > 0 && (
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform",
                                isExpanded && "rotate-180"
                              )}
                            />
                          )}
                        </button>

                        {/* Mobile Sub-items - Vertical */}
                        {isExpanded && module.subItems.length > 0 && (
                          <div className="ml-4 mt-1 flex flex-col gap-0.5">
                            {module.subItems.map((subItem) => {
                              const SubIcon = subItem.icon
                              return (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                >
                                  <SubIcon className="h-4 w-4" />
                                  <span>{subItem.label}</span>
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
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
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
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold">Enterprise</span>
        </Link>

        {/* Mobile Right Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]">
              3
            </Badge>
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
