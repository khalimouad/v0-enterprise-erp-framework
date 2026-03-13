# Full-Page Contact Editor - Quick Start Guide

## 🚀 Getting Started in 2 Minutes

### Step 1: Start Ollama (AI Chat Service)
Open a terminal and run:

```bash
ollama serve
```

If you don't have Ollama installed:
- **macOS**: `brew install ollama`
- **Windows/Linux**: Download from https://ollama.ai

### Step 2: Pull a Model
In a new terminal:

```bash
# Option 1: Fast & Small (Recommended for testing)
ollama pull mistral

# Option 2: More powerful
ollama pull llama2

# Option 3: Great for chat
ollama pull neural-chat
```

### Step 3: Run the App
```bash
npm run dev
```

### Step 4: Test It Out
1. Go to Contacts page
2. Click the **Edit** button (pencil icon) on any contact
3. You'll see the new full-page editor with:
   - **Left panel**: Changelog & AI Chat tabs
   - **Right panel**: Contact editing form
   - **Back button**: Top-left to return to contacts list

---

## 📋 Features Overview

### ✏️ Edit Contact Details
- Organized into 3 tabs: **General**, **Contact Info**, **Company**
- 3-column grid layout for organized data entry
- Grey background (slate-50) for visual separation
- All standard contact fields supported

### 💬 AI Chat Assistant
- Ask questions about the contact
- Context-aware responses using contact data
- Examples:
  - "What are the payment terms?"
  - "Is this an active customer?"
  - "Tell me about this company"
  - "What tags does this contact have?"

### 📝 Changelog & Notes
- Add timestamped notes about contact changes
- Keeps history of all notes
- Track manual updates and observations
- Delete individual notes

---

## 🎨 Layout

```
┌─────────────────────────────────────────────┐
│  ← Global Industries Ltd.                   │
│  Editing contact information                │
├──────────────┬──────────────────────────────┤
│  Changelog   │  Company Name                │
│  AI Chat     │  [Global Industries...]      │
│              │                              │
│  [Tab Area]  │  Type: Customer              │
│              │  Status: Active              │
│              │                              │
│  ────────    │  [Contact Form Tabs]         │
│  Changelog   │  • General                   │
│  ────────    │  • Contact Info              │
│              │  • Company                   │
│  Add Note    │                              │
│  [textarea]  │  [Form Fields in 3 cols]    │
│  [+ Add]     │                              │
│              │  [Cancel] [Save Changes]    │
│  History     │                              │
│  [scroll]    │                              │
└──────────────┴──────────────────────────────┘
```

---

## 🔧 Configuration

Create `.env.local` (copy from `.env.local.example`):

```env
# Ollama Configuration
OLLAMA_API_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=mistral
```

**Supported Models**:
- `mistral` ⭐ Fast, great for testing
- `llama2` - Powerful, good quality
- `neural-chat` - Optimized for conversations
- `dolphin-mixtral` - Very capable
- `tinyllama` - Tiny, super fast
- See full list: https://ollama.ai/library

---

## 🆘 Troubleshooting

### "Unable to connect to AI service"
- Check Ollama is running: `ollama serve`
- Verify URL in `.env.local` is correct
- Make sure model is pulled: `ollama pull mistral`

### "Response takes too long"
- This is normal - first response takes time
- Try a smaller model: `ollama pull tinyllama`

### Chat doesn't appear
- Refresh the page
- Check browser console for errors
- Verify API endpoint is accessible

### Layout looks broken
- Make sure screen width is at least 1200px
- Check for console errors
- Try a different browser

---

## 📱 Responsive Behavior

- **Desktop (>1200px)**: Full 3-column layout
- **Tablet (768-1200px)**: Stacked layout
- **Mobile (<768px)**: Full-screen single column

---

## ✨ Next Steps

1. **Test the features**:
   - Edit a contact's information
   - Add notes to the changelog
   - Ask the AI chat questions

2. **Configure Ollama** (if not done):
   - Switch to different models
   - Adjust temperature/quality in `.env.local`

3. **Connect to Database** (optional):
   - Modify `app/contacts/[id]/edit/page.tsx` to fetch from database
   - Update API route to persist changes
   - See `CONTACT_EDIT_IMPLEMENTATION.md` for details

4. **Customize styling**:
   - Edit colors in `globals.css`
   - Adjust layout in component files
   - Add your own branding

---

## 📚 File Structure

```
app/
├── api/
│   └── chat/
│       └── ollama/
│           └── route.ts              # AI Chat API
├── contacts/
│   ├── page.tsx                       # Updated with new route
│   └── [id]/
│       └── edit/
│           └── page.tsx               # New full-page editor
└── ...

components/
├── contacts/
│   ├── contact-edit-full-page.tsx     # Main layout wrapper
│   ├── contact-details-form.tsx       # Edit form with 3 tabs
│   ├── contact-changelog.tsx          # Notes & history
│   ├── contact-ai-chat.tsx            # AI chatbot UI
│   └── ...
└── ...
```

---

## 🎯 Tips for Best Experience

1. **Use keyboard shortcuts**:
   - `Enter` to send chat message (Shift+Enter for new line)
   - `Tab` to navigate form fields

2. **Keep Ollama running**:
   - The service runs in background
   - First request to model may be slow (initial load)
   - Subsequent requests are faster

3. **Try different models**:
   - `mistral`: Best balance of speed and quality
   - `llama2`: Best quality responses
   - `tinyllama`: Fastest, good for quick tests

4. **Use the changelog**:
   - Track important updates
   - Add context about why changes were made
   - Build audit trail for compliance

---

## 💡 Example Queries

Try asking the AI chat:
- "Summarize this contact"
- "What are their payment terms?"
- "Is this customer active or prospect?"
- "When was this contact created?"
- "List all tags for this contact"
- "What's their industry and location?"
- "Who is our contact person here?"
- "What currency do they use?"

---

## 📞 Support

For issues:
1. Check `CONTACT_EDIT_IMPLEMENTATION.md` for detailed docs
2. Review browser console for error messages
3. Verify Ollama is running and accessible
4. Make sure all environment variables are set correctly

---

Enjoy your new contact editor! 🎉
