import { ERPHeader } from "@/components/erp-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ShoppingCart,
  DollarSign,
  Package,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <ERPHeader activeModule="sales" />

      <main className="p-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Sales Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, John. Here&apos;s what&apos;s happening today.</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +20.1% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2,350</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +180.1% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Products Sold
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,234</div>
              <div className="flex items-center text-xs text-red-600">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -4.3% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Customers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +201 since last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>You have 265 orders this month</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "SO-2024-001", customer: "Acme Corp", amount: "$1,250.00", status: "confirmed" },
                { id: "SO-2024-002", customer: "TechStart Inc", amount: "$3,450.00", status: "pending" },
                { id: "SO-2024-003", customer: "Global Trade", amount: "$890.00", status: "draft" },
                { id: "SO-2024-004", customer: "Retail Plus", amount: "$2,100.00", status: "confirmed" },
                { id: "SO-2024-005", customer: "Innovation Labs", amount: "$5,600.00", status: "invoiced" },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="font-mono text-sm text-muted-foreground">{order.id}</div>
                    <div className="font-medium">{order.customer}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-medium">{order.amount}</div>
                    <Badge
                      variant={
                        order.status === "confirmed"
                          ? "default"
                          : order.status === "pending"
                            ? "secondary"
                            : order.status === "invoiced"
                              ? "outline"
                              : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
