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
  Palette,
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
import { GlobalSearchDialog } from "@/components/global-search-dialog"

// Color themes
export type ColorTheme = "orange" | "slate" | "navy"

interface ThemeConfig {
  label: string
  primary: string
  accent: string
  primaryClass: string
  accentClass: string
}

export const themeConfigs: Record<ColorTheme, ThemeConfig> = {
  orange: {
    label: "Orange",
    primary: "bg-orange-600",
    accent: "bg-orange-500",
    primaryClass: "theme-orange",
    accentClass: "text-orange-500",
  },
  slate: {
    label: "Slate",
    primary: "bg-slate-800",
    accent: "bg-slate-600",
    primaryClass: "theme-slate",
    accentClass: "text-slate-600",
  },
  navy: {
    label: "Navy",
    primary: "bg-blue-900",
    accent: "bg-blue-700",
    primaryClass: "theme-navy",
    accentClass: "text-blue-700",
  },
}

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

interface ERPHeaderProps {
  colorTheme?: ColorTheme
  onThemeChange?: (theme: ColorTheme) => void
}

export function ERPHeader({ colorTheme = "slate", onThemeChange }: ERPHeaderProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [mobileExpandedModule, setMobileExpandedModule] = React.useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  // Global keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Determine active module from pathname
  const activeModule = React.useMemo(() => {
    const found = modules.find((m) => pathname.startsWith(m.href))
    return found?.id || null
  }, [pathname])

  const activeModuleData = modules.find((m) => m.id === activeModule)

  // Get theme-specific classes
  const getThemeClasses = () => {
    switch (colorTheme) {
      case "orange":
        return {
          primary: "bg-orange-600",
          primaryHover: "hover:bg-orange-500/20",
          accent: "bg-orange-500 text-white",
          accentHover: "hover:bg-orange-500/90",
          activeModule: "bg-white/15",
          moduleHover: "hover:bg-white/10",
        }
      case "navy":
        return {
          primary: "bg-blue-950",
          primaryHover: "hover:bg-blue-400/20",
          accent: "bg-blue-600 text-white",
          accentHover: "hover:bg-blue-600/90",
          activeModule: "bg-white/15",
          moduleHover: "hover:bg-white/10",
        }
      default: // slate
        return {
          primary: "bg-slate-800",
          primaryHover: "hover:bg-slate-400/20",
          accent: "bg-slate-600 text-white",
          accentHover: "hover:bg-slate-600/90",
          activeModule: "bg-white/15",
          moduleHover: "hover:bg-white/10",
        }
    }
  }

  const theme = getThemeClasses()

  return (
    <header suppressHydrationWarning className="sticky top-0 z-50 w-full border-b border-border bg-background">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        {/* Primary Navigation Bar - NO hover dropdown, only click navigates */}
        <div className={cn("flex h-14 items-center px-4 gap-4 text-white", theme.primary)}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-md", theme.accent)}>
              <Building2 className="h-5 w-5" />
            </div>
            <span className="font-semibold text-lg">Nexus ERP</span>
          </Link>

          {/* Module Navigation - Horizontal, NO hover submenu */}
          <nav className="flex items-center gap-1 flex-1 ml-6">
            {modules.map((module) => {
              const isActive = activeModule === module.id
              const Icon = module.icon

              return (
                <Link
                  key={module.id}
                  href={module.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? theme.activeModule
                      : cn("text-white/70", theme.moduleHover, "hover:text-white")
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{module.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Color Theme Switcher */}
            {onThemeChange && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                    <Palette className="h-5 w-5" />
                    <span className="sr-only">Change theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onThemeChange("orange")} className="gap-2">
                    <div className="h-4 w-4 rounded-full bg-orange-500" />
                    Orange
                    {colorTheme === "orange" && <span className="ml-auto text-xs">Active</span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onThemeChange("slate")} className="gap-2">
                    <div className="h-4 w-4 rounded-full bg-slate-600" />
                    Slate
                    {colorTheme === "slate" && <span className="ml-auto text-xs">Active</span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onThemeChange("navy")} className="gap-2">
                    <div className="h-4 w-4 rounded-full bg-blue-900" />
                    Navy
                    {colorTheme === "navy" && <span className="ml-auto text-xs">Active</span>}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Global Search */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsSearchOpen(true)}
              className="w-[200px] justify-start bg-white/10 border-0 text-white/70 hover:bg-white/15 hover:text-white"
            >
              <Search className="h-4 w-4 mr-2" />
              <span>Search contacts...</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/20 bg-white/10 px-1.5 font-mono text-[10px] font-medium text-white/70">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10 relative">
              <Bell className="h-5 w-5" />
              <span className={cn("absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full text-[10px] font-bold", theme.accent)}>
                3
              </span>
              <span className="sr-only">Notifications</span>
            </Button>

            {/* Quick Create */}
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
              <Plus className="h-5 w-5" />
              <span className="sr-only">Create new</span>
            </Button>

            {/* Divider */}
            <div className="h-6 w-px bg-white/20 mx-1" />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2 text-white hover:bg-white/10">
                  <Avatar className="h-8 w-8 border border-white/20">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className={cn("text-xs", theme.accent)}>JD</AvatarFallback>
                  </Avatar>
                  <div className="hidden xl:flex flex-col items-start">
                    <span className="text-sm font-medium">John Doe</span>
                    <span className="text-[10px] text-white/60">Administrator</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-white/60" />
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

        {/* Secondary Navigation - Module Children (Horizontal Tab Bar) - Always visible */}
        {activeModuleData && activeModuleData.children.length > 0 && (
          <div className="border-b border-border bg-card">
            <div className="flex items-center gap-1 px-4 h-11 overflow-x-auto">
              <div className="flex items-center gap-2 pr-4 mr-4 border-r border-border">
                {React.createElement(activeModuleData.icon, { 
                  className: cn("h-4 w-4", 
                    colorTheme === "orange" ? "text-orange-500" : 
                    colorTheme === "navy" ? "text-blue-700" : "text-slate-600"
                  ) 
                })}
                <span className="text-sm font-semibold text-foreground whitespace-nowrap">{activeModuleData.label}</span>
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
                        ? colorTheme === "orange" 
                          ? "bg-orange-500/10 text-orange-600"
                          : colorTheme === "navy"
                          ? "bg-blue-700/10 text-blue-700"
                          : "bg-slate-600/10 text-slate-700"
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
      <div className={cn("lg:hidden flex h-14 items-center px-4 gap-4 text-white", theme.primary)}>
        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className={cn("flex items-center justify-between p-4 border-b border-border text-white", theme.primary)}>
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <div className={cn("flex h-8 w-8 items-center justify-center rounded-md", theme.accent)}>
                    <Building2 className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-lg">Nexus ERP</span>
                </Link>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setMobileOpen(false)}>
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
                              ? colorTheme === "orange" 
                                ? "bg-orange-500/10 text-orange-600"
                                : colorTheme === "navy"
                                ? "bg-blue-700/10 text-blue-700"
                                : "bg-slate-600/10 text-slate-700"
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

                        {/* Mobile Children */}
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
                                      ? colorTheme === "orange" 
                                        ? "bg-orange-500/10 text-orange-600"
                                        : colorTheme === "navy"
                                        ? "bg-blue-700/10 text-blue-700"
                                        : "bg-slate-600/10 text-slate-700"
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
                    <AvatarFallback className={cn(theme.accent)}>JD</AvatarFallback>
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
          <div className={cn("flex h-8 w-8 items-center justify-center rounded-md", theme.accent)}>
            <Building2 className="h-5 w-5" />
          </div>
          <span className="font-semibold text-lg">Nexus ERP</span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10 relative">
            <Bell className="h-5 w-5" />
            <span className={cn("absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full text-[10px] font-bold", theme.accent)}>
              3
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile Secondary Navigation */}
      {activeModuleData && activeModuleData.children.length > 0 && (
        <div className="lg:hidden border-b border-border bg-card">
          <div className="flex items-center gap-1 px-4 h-10 overflow-x-auto">
            {activeModuleData.children.map((child) => {
              const ChildIcon = child.icon
              const isChildActive = pathname === child.href
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap",
                    isChildActive
                      ? colorTheme === "orange" 
                        ? "bg-orange-500/10 text-orange-600"
                        : colorTheme === "navy"
                        ? "bg-blue-700/10 text-blue-700"
                        : "bg-slate-600/10 text-slate-700"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <ChildIcon className="h-3.5 w-3.5" />
                  <span>{child.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Global Search Dialog */}
      <GlobalSearchDialog 
        open={isSearchOpen} 
        onOpenChange={setIsSearchOpen}
        userPermissions="all"
      />
    </header>
  )
}
