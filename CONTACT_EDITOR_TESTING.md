# Contact Editor - Testing Scenarios

## Pre-Flight Checklist ✈️

- [ ] Node.js installed (`node --version`)
- [ ] npm/yarn installed (`npm --version`)
- [ ] Ollama downloaded from https://ollama.ai
- [ ] Environment variables configured in `.env.local`

---

## Setup & Launch

### 1. Start Ollama Service (Terminal 1)
```bash
# Start Ollama
ollama serve

# In another terminal, pull a model
ollama pull mistral
```

### 2. Start Dev Server (Terminal 2)
```bash
cd /path/to/project
npm run dev

# Should see: ▲ Next.js 15.x started
# Open: http://localhost:3000
```

---

## Test Scenarios

### Scenario 1: Navigate to Full-Page Editor ✅

**Steps:**
1. Go to http://localhost:3000/contacts
2. Find any contact in the list
3. Click the **Edit** button (pencil icon)

**Expected Result:**
- Navigated to `/contacts/{id}/edit` page
- Page shows contact name in header
- Back button (← arrow) visible at top-left
- 3-column layout appears:
  - Left panel: Changelog and AI Chat tabs
  - Right panel: Contact form
- No errors in browser console

**Pass Criteria:**
- ✅ Page loads without errors
- ✅ Layout is 3-column
- ✅ Contact name displayed in header
- ✅ Back button visible

---

### Scenario 2: Back Button Navigation 🔙

**Steps:**
1. Click the back button (← arrow) at top-left

**Expected Result:**
- Navigated back to `/contacts` page
- Contacts list displayed normally
- Previous selection is cleared

**Pass Criteria:**
- ✅ Successfully returns to contacts list
- ✅ List view restored

---

### Scenario 3: Edit Contact Details ✏️

**Steps:**
1. On the edit page, click the **General** tab
2. Change the company name to "Test Company"
3. Scroll down and change status to "Inactive"
4. Click **Save Changes** button

**Expected Result:**
- Form fields respond to input
- Changes are captured in state
- Save button is clickable
- No validation errors

**Pass Criteria:**
- ✅ Form inputs work
- ✅ State updates
- ✅ Save button functional

---

### Scenario 4: Form Tabs Navigation 📑

**Steps:**
1. Click **Contact Info** tab
2. Verify email, phone, website fields appear
3. Click **Company** tab
4. Verify currency, payment terms fields appear
5. Click **General** tab again
6. Verify company name field still shows

**Expected Result:**
- Tab switching works smoothly
- Correct fields appear for each tab
- Data persists when switching tabs

**Pass Criteria:**
- ✅ All tabs are clickable
- ✅ Correct fields in each tab
- ✅ Tab switching is instant

---

### Scenario 5: Add Changelog Note 📝

**Steps:**
1. Click **Changelog** tab in left panel
2. Type: "Updated address information"
3. Click **Add Note** button

**Expected Result:**
- Note appears in the History section
- Note shows: timestamp, user name, note text
- "Add Note" button is disabled (grayed out) if textarea empty
- History list scrolls if needed

**Pass Criteria:**
- ✅ Note added to history
- ✅ Timestamp visible
- ✅ Note persists in list
- ✅ Input field clears after submission

---

### Scenario 6: Delete Changelog Note 🗑️

**Steps:**
1. In the changelog history, hover over a note
2. Click the trash icon button

**Expected Result:**
- Note is removed from history list
- Other notes remain

**Pass Criteria:**
- ✅ Note deleted successfully
- ✅ Remaining notes stay

---

### Scenario 7: AI Chat - Send Message 🤖

**Prerequisite:**
- Ollama service is running
- Model pulled and ready

**Steps:**
1. Click **AI Chat** tab in left panel
2. Type: "What are the payment terms?"
3. Press Enter or click Send button

**Expected Result:**
- Message appears in chat (blue bubble, right aligned)
- Loading spinner appears below
- After 5-15 seconds, AI response appears (grey bubble, left aligned)
- Response contains information about payment terms
- Input field clears and is ready for next message

**Pass Criteria:**
- ✅ Message sent successfully
- ✅ Loading state visible
- ✅ AI response received
- ✅ Response is relevant and based on contact data

---

### Scenario 8: AI Chat - Multiple Messages 💬

**Steps:**
1. Send: "Is this customer active?"
2. Send: "What is the industry?"
3. Send: "Tell me about this company"

**Expected Result:**
- All messages appear in correct order
- Each message gets a response
- Chat history visible and scrollable
- Timestamps on each message
- Scroll area auto-scrolls to latest message

**Pass Criteria:**
- ✅ Multiple messages work
- ✅ Conversation history maintained
- ✅ Context used in responses
- ✅ Auto-scroll to bottom works

---

### Scenario 9: AI Chat Error Handling ⚠️

**Steps:**
1. Stop Ollama service (Ctrl+C in Ollama terminal)
2. Try sending a message: "What is this?"

**Expected Result:**
- Message still sent
- After 10 seconds, helpful error message appears
- Error explains Ollama needs to be running
- Chat is still usable after error
- Suggestion to start Ollama

**Pass Criteria:**
- ✅ Error handled gracefully
- ✅ Helpful message shown
- ✅ App doesn't crash
- ✅ User can restart Ollama and try again

---

### Scenario 10: Keyboard Shortcuts ⌨️

**Steps:**
1. Click in AI Chat input field
2. Type: "Hello"
3. Press **Enter** (not Shift+Enter)

**Expected Result:**
- Message sent immediately
- No new line added
- Input field clears

**Alternative (Shift+Enter):**
- Type: "Line 1"
- Press **Shift+Enter**
- Type: "Line 2"
- Result: Multi-line message

**Pass Criteria:**
- ✅ Enter sends message
- ✅ Shift+Enter creates new line

---

### Scenario 11: Responsive Layout Test 📱

**Steps:**
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select "Tablet" breakpoint (768px)
4. Refresh page

**Expected Result:**
- Layout stacks vertically on tablet
- All elements still visible and functional
- No horizontal scroll needed

**Steps (Mobile):**
1. Select "Mobile" breakpoint (375px)
2. Refresh page

**Expected Result:**
- Layout is full-width mobile version
- Single column layout
- All tabs and buttons work

**Pass Criteria:**
- ✅ Responsive at all breakpoints
- ✅ No broken layout
- ✅ All interactive elements work

---

### Scenario 12: Dark Mode Test 🌙

**Steps:**
1. System has dark mode enabled
2. Reload the page

**Expected Result:**
- Dark background (slate-950)
- Light text (slate-100)
- Borders adjusted (slate-800)
- All text readable
- Form fields visible

**Pass Criteria:**
- ✅ Dark mode colors applied
- ✅ Contrast is good
- ✅ All elements visible

---

### Scenario 13: Long Changelog History 📚

**Steps:**
1. Add 10+ notes to the changelog
2. Scroll through history

**Expected Result:**
- History area scrolls independently
- All notes visible
- No overflow issues
- Right side form still visible

**Pass Criteria:**
- ✅ ScrollArea works
- ✅ All notes accessible
- ✅ Layout doesn't break

---

### Scenario 14: Long Contact Names 📛

**Steps:**
1. Navigate to contact: "Pacific Trading Co. - Asia Region Extended"
2. Check header display

**Expected Result:**
- Contact name displays properly
- No overlap with back button
- Text truncates gracefully if too long

**Pass Criteria:**
- ✅ Header text readable
- ✅ No overlapping elements

---

### Scenario 15: All Form Fields 🎯

**Steps:**
1. Click each tab and verify all fields:

**General Tab:**
- [ ] Company Name (text input)
- [ ] Type (dropdown)
- [ ] Status (dropdown)
- [ ] Customer Rank (dropdown)
- [ ] Supplier Rank (dropdown)
- [ ] Industry (text input)

**Contact Info Tab:**
- [ ] Email (email input)
- [ ] Phone (tel input)
- [ ] Website (text input)
- [ ] Street Address (text input)
- [ ] City (text input)
- [ ] Country (text input)

**Company Tab:**
- [ ] Currency (dropdown)
- [ ] Payment Terms (dropdown)
- [ ] Notes (text input)

**Expected Result:**
- All fields render correctly
- All fields are editable
- All dropdowns have options
- No console errors

**Pass Criteria:**
- ✅ All fields present
- ✅ All fields functional

---

## Performance Tests 🏃

### Scenario 16: Initial Load Time ⏱️

**Steps:**
1. Open DevTools → Network tab
2. Clear cache (Ctrl+Shift+Delete)
3. Navigate to `/contacts/c1/edit`
4. Check network timing

**Expected Result:**
- Page fully loads in < 3 seconds
- No hanging requests
- Images load smoothly
- No 404 errors

**Pass Criteria:**
- ✅ Fast load time
- ✅ No network errors

---

### Scenario 17: AI Response Time ⏳

**Steps:**
1. Send message to AI
2. Time the response

**Expected Result:**
- First response: 5-15 seconds (model loading)
- Subsequent responses: 2-5 seconds
- Response content is relevant

**Pass Criteria:**
- ✅ Reasonable response time
- ✅ Consistent performance

---

## Browser Compatibility 🌐

Test on:
- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Expected Result:**
- All features work on all browsers
- No console errors
- Layout renders correctly

---

## Summary Report Template

```
Test Date: _______________
Tester: ___________________
Browser: __________________
OS: ________________________

Passed Tests: ___/17
Failed Tests: ___/17
Skipped Tests: ___/17

Issues Found:
1. [Issue description]
2. [Issue description]

Notes:
[Additional observations]

Status: ☐ PASS ☐ FAIL
```

---

## Quick Pass/Fail Matrix

| Scenario | Expected | Status | Notes |
|----------|----------|--------|-------|
| 1. Navigation | Page loads with 3-column layout | ☐ | |
| 2. Back Button | Returns to contacts list | ☐ | |
| 3. Edit Form | Fields update and save works | ☐ | |
| 4. Tab Switching | All tabs switch smoothly | ☐ | |
| 5. Add Note | Note appears in history | ☐ | |
| 6. Delete Note | Note removed from history | ☐ | |
| 7. Send Message | AI responds with relevant answer | ☐ | |
| 8. Multiple Messages | Conversation maintained | ☐ | |
| 9. Error Handling | Graceful error if no Ollama | ☐ | |
| 10. Keyboard Shortcuts | Enter sends, Shift+Enter newline | ☐ | |
| 11. Responsive | Works on all screen sizes | ☐ | |
| 12. Dark Mode | All elements visible | ☐ | |
| 13. Long Lists | Scrolling works properly | ☐ | |
| 14. Long Names | Text displays correctly | ☐ | |
| 15. All Fields | All form fields present/working | ☐ | |
| 16. Load Time | < 3 seconds total | ☐ | |
| 17. Browser Support | Works on Chrome/Firefox/Safari/Edge | ☐ | |

---

## Rollback Plan 🔄

If major issues found:

1. Check browser console for errors
2. Verify Ollama is running
3. Check environment variables
4. Review console logs for helpful messages
5. Restart dev server
6. Clear browser cache

---

## Sign-Off

By signing below, I confirm that the contact editor implementation has been tested and meets the requirements.

**Tester Name:** _________________________
**Date:** _________________________________
**Status:** ☐ APPROVED ☐ NEEDS FIXES

---

Happy Testing! 🚀
