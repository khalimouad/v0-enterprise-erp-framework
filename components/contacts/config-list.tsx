import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus } from "lucide-react"
import { addConfigItem, removeConfigItem } from "@/lib/contact-config"

interface ConfigListProps {
  title: string
  description: string
  items: string[]
  category: string
  icon?: React.ReactNode
  onItemsChange: (items: string[]) => void
}

export function ConfigList({ title, description, items, category, icon, onItemsChange }: ConfigListProps) {
  const [newItem, setNewItem] = React.useState("")
  const [localItems, setLocalItems] = React.useState(items)

  const handleAddItem = () => {
    if (newItem.trim() && !localItems.includes(newItem)) {
      const updated = [...localItems, newItem]
      setLocalItems(updated)
      onItemsChange(updated)
      addConfigItem(category as any, newItem)
      setNewItem("")
    }
  }

  const handleRemoveItem = (item: string) => {
    const updated = localItems.filter(i => i !== item)
    setLocalItems(updated)
    onItemsChange(updated)
    removeConfigItem(category as any, item)
  }

  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader>
        <div className="flex items-start gap-3">
          {icon && <div className="text-2xl">{icon}</div>}
          <div className="flex-1">
            <CardTitle className="text-base font-bold">{title}</CardTitle>
            <CardDescription className="text-xs">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input for new item */}
        <div className="flex gap-2">
          <Input
            placeholder={`Ajouter un nouvel élément...`}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddItem()
              }
            }}
            className="h-9 bg-slate-50 dark:bg-slate-800"
          />
          <Button
            size="sm"
            onClick={handleAddItem}
            className="gap-1 bg-blue-600 hover:bg-blue-700 text-white h-9"
          >
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
        </div>

        {/* Items list */}
        <div className="space-y-2">
          {localItems.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-4">Aucun élément</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {localItems.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-sm font-medium"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="inline-flex hover:opacity-70 transition-opacity"
                    title="Remove"
                  >
                    <X className="h-3.5 w-3.5 text-slate-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
