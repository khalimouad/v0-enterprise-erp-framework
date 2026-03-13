# 🎨 Contact Editor - Visual Layout Guide

## Full-Page Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ ← Global Industries Ltd. | Editing contact information           │  Header
│ (Back Button)            | (Description)                         │  Height: 80px
├────────────────────────────┬──────────────────────────────────────┤
│                            │                                      │
│      LEFT PANEL (1/3)      │      RIGHT PANEL (2/3)              │
│                            │                                      │
│  ┌─────────────────────┐   │  ┌────────────────────────────────┐ │
│  │ Changelog │ AI Chat │   │  │ General│Contact│Company        │ │
│  ├─────────────────────┤   │  ├────────────────────────────────┤ │
│  │                     │   │  │                                │ │
│  │  CHANGELOG TAB      │   │  │  CONTACT FORM (Active Tab)    │ │
│  │  ────────────────   │   │  │  ───────────────────────────  │ │
│  │                     │   │  │                                │ │
│  │  Add Note Section   │   │  │  Company Name               │ │
│  │  ┌─────────────┐    │   │  │  [Global Industries...]     │ │
│  │  │ Textarea    │    │   │  │                             │ │
│  │  │ Add note    │    │   │  │  Type         Status        │ │
│  │  │ here...     │    │   │  │  [Customer]   [Active]      │ │
│  │  │             │    │   │  │                             │ │
│  │  │ [+ Add]     │    │   │  │  Customer Rank  Industry    │ │
│  │  └─────────────┘    │   │  │  [5 Stars]      [Manuf.]    │ │
│  │                     │   │  │                             │ │
│  │  History Section    │   │  │  ──────────────────────────  │ │
│  │  ──────────────     │   │  │                                │ │
│  │                     │   │  │  Email              Phone      │ │
│  │  ┌─────────────┐    │   │  │  [contact@...]      [+1555]   │ │
│  │  │ John Doe    │    │   │  │                                │ │
│  │  │ 2:30 PM     │    │   │  │  Website            Address    │ │
│  │  │ Updated     │    │   │  │  [globalind.com]    [350...]   │ │
│  │  │ payment     │    │   │  │                                │ │
│  │  │ terms       │ [x]│   │  │  City               Country     │ │
│  │  └─────────────┘    │   │  │  [New York]         [USA]      │ │
│  │                     │   │  │                                │ │
│  │  ┌─────────────┐    │   │  │  ──────────────────────────  │ │
│  │  │ Jane Smith  │    │   │  │                                │ │
│  │  │ 10:15 AM    │    │   │  │           Footer               │ │
│  │  │ Changed     │    │   │  │  [Cancel]  [Save Changes]      │ │
│  │  │ status to   │    │   │  │                                │ │
│  │  │ Active      │ [x]│   │  │                                │ │
│  │  └─────────────┘    │   │  │                                │ │
│  │                     │   │  │                                │ │
│  │  [Scrollable ↓]     │   │  │                                │ │
│  │                     │   │  │                                │ │
│  │                     │   │  │                                │ │
│  └─────────────────────┘   │  └────────────────────────────────┘ │
│                            │                                      │
│  ┌─────────────────────┐   │  ┌────────────────────────────────┐ │
│  │ AI Chat │ (Hidden)  │   │  │ General│Contact│Company        │ │
│  ├─────────────────────┤   │  └────────────────────────────────┘ │
│  │                     │   │                                      │
│  │  [Messages Area]    │   │  [Different tab content would]       │
│  │                     │   │  [show here when selected]           │
│  │  ┌─────────────┐    │   │                                      │
│  │  │ Assistant   │    │   │                                      │
│  │  │ Hi! Ask me  │    │   │                                      │
│  │  │ about this  │    │   │                                      │
│  │  │ contact     │    │   │                                      │
│  │  └─────────────┘    │   │                                      │
│  │                     │   │                                      │
│  │  ┌─────────────┐    │   │                                      │
│  │  │ User        │    │   │                                      │
│  │  │ What's the  │    │   │                                      │
│  │  │ payment     │    │   │                                      │
│  │  │ terms?      │    │   │                                      │
│  │  └─────────────┘    │   │                                      │
│  │                     │   │                                      │
│  │  Input Area:        │   │                                      │
│  │  [Question....] [↑] │   │                                      │
│  │                     │   │                                      │
│  └─────────────────────┘   │                                      │
│                            │                                      │
└────────────────────────────┴──────────────────────────────────────┘

Left Panel: 33% width (300-400px)
Right Panel: 67% width (600-800px)
Gap: 16px (1rem)
Padding: 24px (1.5rem) all sides
```

---

## Responsive Breakpoints

### Desktop (>1200px)
```
┌──────────────────────────────────────┐
│ Header                               │
├────────────────┬────────────────────┤
│   Left (1/3)   │    Right (2/3)     │
│                │                    │
│ • Changelog    │  Contact Form      │
│ • AI Chat      │  (3 tabs)          │
│                │                    │
└────────────────┴────────────────────┘
```

### Tablet (768-1200px)
```
┌──────────────────────┐
│ Header               │
├──────────────────────┤
│ Tabs (tabs switch)   │
├──────────────────────┤
│ Changelog / Chat     │
│ (single column)      │
├──────────────────────┤
│ Contact Form         │
│ (full width)         │
└──────────────────────┘
```

### Mobile (<768px)
```
┌──────────┐
│ Header   │
├──────────┤
│ Back btn │
├──────────┤
│ Tabs     │
├──────────┤
│ Content  │
│ (full w) │
├──────────┤
│ Footer   │
└──────────┘
```

---

## Color Scheme

### Light Mode
```
Background:     slate-50    (#F8FAFC)
Card:           white       (#FFFFFF)
Border:         slate-200   (#E2E8F0)
Text Primary:   slate-900   (#0F172A)
Text Secondary: slate-600   (#475569)
Accent:         blue-500    (#3B82F6)
Success:        green-500   (#10B981)
```

### Dark Mode
```
Background:     slate-950   (#030712)
Card:           slate-900   (#0F172A)
Border:         slate-800   (#1E293B)
Text Primary:   slate-100   (#F1F5F9)
Text Secondary: slate-400   (#94A3B8)
Accent:         blue-600    (#2563EB)
Success:        green-600   (#059669)
```

---

## Component Spacing

```
Header:
├─ Padding: 16px top/bottom, 24px left/right
├─ Back Button: 8x8px (icon), 32x32px (total)
├─ Title: 24px font size, 32px line height
└─ Description: 14px font size, 20px line height

Main Grid:
├─ Padding: 24px all sides
├─ Gap between columns: 16px
├─ Left Column: 33% width
└─ Right Column: 67% width

Form Section:
├─ Tab Padding: 24px
├─ Field Spacing: 16px vertical
├─ Field Grid: 3 columns, 16px gap
├─ Input Height: 40px
└─ Button Height: 40px

Changelog:
├─ Textarea: min-height 80px
├─ Note Padding: 12px
├─ Note Margin: 12px (vertical)
├─ History max-height: 400px
└─ Scroll enabled

Chat:
├─ Messages area: max-height 400px
├─ Input Height: 40px
├─ Message Margin: 12px (vertical)
└─ Avatar: 24x24px
```

---

## Typography

```
Header Title:
├─ Font: Geist (sans-serif)
├─ Size: 24px (1.5rem)
├─ Weight: 700 (bold)
├─ Line Height: 1.5
└─ Color: slate-900 / slate-100

Header Description:
├─ Font: Geist
├─ Size: 14px (0.875rem)
├─ Weight: 400 (normal)
├─ Line Height: 1.4
└─ Color: slate-500 / slate-400

Form Labels:
├─ Font: Geist
├─ Size: 14px (0.875rem)
├─ Weight: 500 (medium)
├─ Line Height: 1.4
└─ Color: slate-700 / slate-300

Form Inputs:
├─ Font: Geist
├─ Size: 14px
├─ Weight: 400
├─ Line Height: 1.5
└─ Placeholder: slate-400 / slate-600

Chat Messages:
├─ Font: Geist
├─ Size: 14px
├─ Weight: 400
├─ Line Height: 1.5
└─ Color: based on message type
```

---

## Interactive Elements

### Buttons
```
Primary (Save Changes):
├─ Background: blue-500
├─ Hover: blue-600
├─ Active: blue-700
├─ Padding: 8px 16px
├─ Border Radius: 6px
├─ Font: 14px semi-bold
└─ Height: 40px

Secondary (Cancel):
├─ Background: transparent
├─ Border: 1px slate-300
├─ Hover: slate-100
├─ Padding: 8px 16px
├─ Border Radius: 6px
├─ Font: 14px semi-bold
└─ Height: 40px

Icon Button:
├─ Size: 32x32px
├─ Icon: 16x16px
├─ Hover: slate-100 background
├─ Border Radius: 6px
└─ Transition: 150ms
```

### Form Inputs
```
Text Input:
├─ Height: 40px
├─ Padding: 8px 12px
├─ Border: 1px slate-200
├─ Border Radius: 6px
├─ Font: 14px
├─ Focus: outline, blue border
└─ Disabled: slate-100 background

Textarea:
├─ Min Height: 80px
├─ Padding: 8px 12px
├─ Border: 1px slate-200
├─ Border Radius: 6px
├─ Font: 14px
├─ Resize: vertical only
├─ Focus: outline, blue border
└─ Line Height: 1.5

Select Dropdown:
├─ Height: 40px
├─ Padding: 8px 12px
├─ Border: 1px slate-200
├─ Border Radius: 6px
├─ Background: white/slate-900
└─ Icon: right aligned
```

### Tabs
```
Tab List:
├─ Display: flex
├─ Gap: 0
├─ Border Bottom: 1px slate-200
└─ Padding: 0

Tab Button:
├─ Padding: 12px 16px
├─ Border Bottom: 2px transparent
├─ Font: 14px semi-bold
├─ Active: blue-500 border
└─ Cursor: pointer

Tab Content:
├─ Padding: 24px
├─ Display: fade in animation
└─ Height: adjusts to content
```

---

## Animations

```
Tab Switch:
├─ Transition: 150ms ease-in-out
├─ Opacity: fade
└─ Cursor: pointer

Message Slide In:
├─ Animation: slide up
├─ Duration: 200ms
├─ Easing: ease-out
└─ Direction: bottom to top

Button Hover:
├─ Background: darken
├─ Duration: 150ms
├─ Shadow: slight elevation
└─ Cursor: pointer

Input Focus:
├─ Border: blue-500
├─ Box-shadow: ring effect
├─ Duration: 150ms
└─ Transition: smooth
```

---

## Key Layout Features

### 3-Column Grid
- `display: grid`
- `grid-template-columns: 1fr 2fr`
- `gap: 1rem`
- Responsive to single column on mobile

### Flexbox Sections
- Header: `flex items-center justify-between`
- Tabs: `flex flex-col`
- Form fields: `grid grid-cols-3 gap-4`

### Scroll Areas
- Changelog history: max-height 400px, scrollable
- Chat messages: max-height 400px, scrollable
- Form content: auto scroll if needed

### Z-Index
```
Header:          10
Dropdown menu:   50
Modal overlay:   100 (if added)
Tooltip:         40
```

---

## Dark Mode Implementation

All colors use CSS variables that swap on `.dark` class:

```css
:root {
  --background: oklch(...);
  --foreground: oklch(...);
  --primary: oklch(...);
  --accent: oklch(...);
}

@custom-variant dark (&:is(.dark *)) {
  /* Dark mode colors */
}
```

Classes use design tokens:
- `bg-background` / `bg-foreground`
- `text-foreground` / `text-muted-foreground`
- `border-border`
- `bg-primary`

---

## Accessibility

### Semantic HTML
- `<main>` for main content
- `<header>` for page header
- `<form>` for form sections
- `<button>` for buttons
- `<input>`, `<textarea>`, `<select>` for form fields

### ARIA Attributes
- `role="tab"` on tab buttons
- `aria-selected` on active tabs
- `aria-label` on icon buttons
- `aria-describedby` for form hints
- `aria-live` for dynamic updates

### Keyboard Navigation
- Tab through focusable elements
- Enter to activate buttons
- Enter/Space to toggle tabs
- Escape to close menus

### Color Contrast
- WCAG AA compliant
- Text: 4.5:1 minimum
- UI: 3:1 minimum
- Works in dark mode too

---

## Performance Considerations

### CSS
- Minimal custom CSS (mostly Tailwind)
- No animations on critical elements
- GPU accelerated transitions
- Optimized color calculations

### JavaScript
- Lazy component loading
- Memoized components
- Efficient state management
- Debounced scroll/resize handlers

### Images
- None (UI only)
- Icons via Lucide (SVG)
- Inline colors (no image processing)

### Bundle
- Tree-shaking enabled
- Minimal dependencies
- Code splitting by route
- Vendor splitting

---

## This visual guide shows:
✅ Full layout with all components  
✅ Responsive design across devices  
✅ Color scheme and theming  
✅ Spacing and typography  
✅ Interactive elements  
✅ Animations  
✅ Accessibility  
✅ Performance optimizations  

For more details, see the implementation documentation! 📚
