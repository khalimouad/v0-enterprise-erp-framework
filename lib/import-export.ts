'use client'

export interface ImportExportData {
  type: 'regions' | 'cities' | 'countries' | 'industries' | 'statuses'
  items: string[]
  exportedAt: string
  version: '1.0'
}

// Export data as JSON
export const exportAsJSON = (items: string[], type: string): void => {
  const data: ImportExportData = {
    type: type as any,
    items,
    exportedAt: new Date().toISOString(),
    version: '1.0'
  }
  
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${type}-${Date.now()}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Export data as CSV
export const exportAsCSV = (items: string[], type: string): void => {
  const csvContent = ['Item', ...items].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${type}-${Date.now()}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Import data from JSON file
export const importFromJSON = (file: File): Promise<{ items: string[], type: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as ImportExportData
        if (!data.type || !Array.isArray(data.items)) {
          reject(new Error('Invalid import file format'))
        }
        resolve({ items: data.items, type: data.type })
      } catch (error) {
        reject(new Error('Failed to parse JSON file'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}

// Import data from CSV file
export const importFromCSV = (file: File): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string
        const lines = csv.split('\n').map(line => line.trim()).filter(line => line && line !== 'Item')
        if (lines.length === 0) {
          reject(new Error('CSV file is empty'))
        }
        resolve(lines)
      } catch (error) {
        reject(new Error('Failed to parse CSV file'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}
