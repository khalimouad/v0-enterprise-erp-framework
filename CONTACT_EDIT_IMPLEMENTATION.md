# Contact Edit Full-Page Implementation

## Overview
This implementation adds a full-page contact editing experience inspired by SAP/Sage enterprise systems. When users click "Edit" on a contact, they are navigated to a dedicated full-page editor with:

- **SAP/Sage inspired layout** with professional enterprise styling
- **3-column grid design**: Left (1/3) for changelog & AI chat, Right (2/3) for contact details
- **Back button** for easy navigation back to contacts list
- **Tabbed interface** for different contact sections (General, Contact Info, Company)
- **AI-powered chat** using Ollama for context-aware questions about contact data
- **Changelog tracking** for user-added notes and comments with timestamps

## Architecture

### New Files Created

1. **`app/contacts/[id]/edit/page.tsx`**
   - Main page component for the full-page contact editor
   - Shows header with back button and contact name
   - Handles contact lookup and error states
   - Uses the new `ContactEditFullPage` component

2. **`components/contacts/contact-edit-full-page.tsx`**
   - Main wrapper component with 3-column grid layout
   - Manages state for edited contact
   - Contains Tabs for switching between changelog, AI chat, and details

3. **`components/contacts/contact-details-form.tsx`**
   - Full contact editing form with 3-column data grids
   - Organized into tabs: General, Contact Info, Company
   - Uses grey background (slate-50) for visual separation
   - Includes Save and Cancel buttons

4. **`components/contacts/contact-changelog.tsx`**
   - Left panel component for tracking changes and notes
   - Allows users to add timestamped notes
   - Displays history of all added notes
   - Delete functionality for individual notes

5. **`components/contacts/contact-ai-chat.tsx`**
   - AI chatbot interface powered by Ollama
   - Contextual questions about the contact
   - Streaming message updates
   - Error handling if Ollama service is unavailable

6. **`app/api/chat/ollama/route.ts`**
   - API endpoint for chat interactions
   - Builds context from contact data
   - Calls Ollama API with conversation history
   - Includes fallback messages for service unavailability

### Modified Files

- **`app/contacts/page.tsx`**
  - Updated `handleEdit` to navigate to new route instead of opening side panel
  - Added `useRouter` import for navigation

## Setup Instructions

### 1. Install Ollama
The AI chatbot requires Ollama to be installed and running locally:

```bash
# Download Ollama from https://ollama.ai
# Or on macOS:
brew install ollama

# Start Ollama service
ollama serve

# In another terminal, pull a model (default is llama2):
ollama pull llama2

# Or use a faster, smaller model:
ollama pull mistral
```

### 2. Configure Environment Variables
Copy `.env.local.example` to `.env.local` and update if needed:

```bash
# .env.local
OLLAMA_API_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=llama2
```

Supported models (pull and run any of these):
- `llama2` - Powerful, good for complex reasoning
- `mistral` - Fast, 7B parameters
- `neural-chat` - Optimized for conversations
- `dolphin-mixtral` - Great quality
- See https://ollama.ai/library for more options

### 3. Run the Application

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Make sure Ollama is running in another terminal
ollama serve
```

## Usage

### Editing a Contact

1. Go to the Contacts page
2. Click the **Edit** button (pencil icon) on any contact
3. You'll be taken to the full-page editor with:
   - **Back button** at top-left to return to contacts
   - **Right panel (2/3)** - Contact details in tabs
   - **Left panel (1/3)** - Toggle between Changelog and AI Chat

### Adding Notes to Changelog

1. Click the **Changelog** tab in the left panel
2. Type your note in the textarea
3. Click **Add Note**
4. Notes appear with timestamp and current user name
5. Delete notes with the trash icon

### Using the AI Chat

1. Click the **AI Chat** tab in the left panel
2. Ask questions about the contact:
   - "What's the payment terms for this customer?"
   - "Is this customer active?"
   - "Show me all the tags for this contact"
   - "What industry are they in?"
3. The AI will provide context-aware answers based on contact data

## Troubleshooting

### AI Chat Not Working

**Problem**: "Unable to connect to AI service"
- **Solution**: Make sure Ollama is running with `ollama serve`
- Check that `OLLAMA_API_URL` points to correct endpoint (default: `http://localhost:11434`)

**Problem**: Response takes too long or times out
- **Solution**: This is normal for first requests. Ollama is generating responses. Wait 5-15 seconds
- Try with a smaller model: `ollama pull mistral`

**Problem**: "Model not found" error
- **Solution**: Pull the model first: `ollama pull llama2`

### Layout Issues

- If 3-column layout looks cramped, ensure your screen width is >= 1200px
- On mobile/tablet, the layout will stack (responsive design uses full width)

### Navigation Issues

- Back button always takes you to the contacts list page
- You can also use browser back button

## Design Specifications

### Layout
- **Total Width**: 3 columns
- **Left Column**: 1/3 width (300-400px) - Changelog & AI Chat
- **Right Column**: 2/3 width (600-800px) - Contact Details
- **Gap**: 1rem (16px) between columns
- **Padding**: 1.5rem (24px) all sides

### Colors (from globals.css)
- **Background**: slate-50 (light) / slate-950 (dark)
- **Cards**: white/slate-900
- **Borders**: slate-200/slate-800
- **Text**: slate-900/slate-100
- **Accent**: blue-500/600

### Typography
- **Headers**: font-bold, various sizes
- **Labels**: text-sm, font-medium
- **Body**: text-sm, normal weight

## Future Enhancements

1. **Database Integration**
   - Store changelog entries in database
   - Persist contact changes to database
   - Track who made changes (user context)

2. **Real-time Updates**
   - WebSocket updates when contact is edited elsewhere
   - Real-time collaboration indicators

3. **Advanced AI Features**
   - Document upload for additional context
   - File attachment support in chat
   - AI-suggested improvements for contact data

4. **Audit Trail**
   - Auto-track all field changes (not just manual notes)
   - Show before/after values
   - Filter changelog by date range or user

5. **Export/Reporting**
   - Export changelog as PDF
   - Generate contact summary reports
   - Email contact details

## Component Props

### ContactEditFullPage
```typescript
interface ContactEditFullPageProps {
  contact: Contact
}
```

### ContactDetailsForm
```typescript
interface ContactDetailsFormProps {
  contact: Contact
  onChange: (contact: Contact) => void
}
```

### ContactChangeLog
```typescript
interface ContactChangeLogProps {
  contactId: string
}
```

### ContactAIChat
```typescript
interface ContactAIChatProps {
  contact: Contact
}
```

## API Endpoint

### POST `/api/chat/ollama`

**Request Body**:
```json
{
  "message": "What is the payment terms?",
  "contact": { ...Contact object... },
  "conversationHistory": [ ...previous messages... ]
}
```

**Response**:
```json
{
  "response": "The payment terms for this customer are Net 30 Days.",
  "success": true
}
```

**Error Response**:
```json
{
  "error": "Failed to process chat message",
  "success": false
}
```
