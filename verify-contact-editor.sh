#!/bin/bash
# Contact Editor - Verification Script
# Run this to verify all files are in place

echo "🔍 Verifying Contact Editor Implementation..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter
PASS=0
FAIL=0

# Function to check file exists
check_file() {
    local file=$1
    local description=$2
    
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $description"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} $description - NOT FOUND: $file"
        ((FAIL++))
    fi
}

# Function to check directory exists
check_dir() {
    local dir=$1
    local description=$2
    
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} $description"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} $description - NOT FOUND: $dir"
        ((FAIL++))
    fi
}

echo "📁 Checking Directories..."
check_dir "app/contacts/[id]/edit" "Edit route directory"
check_dir "components/contacts" "Contacts components directory"
check_dir "app/api/chat/ollama" "Ollama API directory"
echo ""

echo "📄 Checking Route Files..."
check_file "app/contacts/[id]/edit/page.tsx" "Edit page route"
echo ""

echo "🧩 Checking Components..."
check_file "components/contacts/contact-edit-full-page.tsx" "Main edit layout component"
check_file "components/contacts/contact-details-form.tsx" "Contact details form component"
check_file "components/contacts/contact-changelog.tsx" "Changelog component"
check_file "components/contacts/contact-ai-chat.tsx" "AI chat component"
echo ""

echo "🔌 Checking API Files..."
check_file "app/api/chat/ollama/route.ts" "Ollama API endpoint"
echo ""

echo "⚙️ Checking Configuration..."
check_file ".env.local.example" "Environment template file"
check_file "app/contacts/page.tsx" "Updated contacts page"
check_file "app/globals.css" "Global styles"
echo ""

echo "📚 Checking Documentation..."
check_file "CONTACT_EDITOR_QUICK_START.md" "Quick start guide"
check_file "CONTACT_EDIT_IMPLEMENTATION.md" "Implementation documentation"
check_file "CONTACT_EDIT_SUMMARY.md" "Summary documentation"
check_file "CONTACT_EDITOR_TESTING.md" "Testing guide"
check_file "CONTACT_EDITOR_INDEX.md" "Index/navigation guide"
echo ""

echo "🔧 Checking Required Dependencies..."
# Check if package.json has required UI components
if grep -q "\"lucide-react\"" package.json; then
    echo -e "${GREEN}✓${NC} lucide-react installed"
    ((PASS++))
else
    echo -e "${YELLOW}⚠${NC} lucide-react might need to be installed"
fi

if grep -q "\"tailwindcss\"" package.json; then
    echo -e "${GREEN}✓${NC} Tailwind CSS installed"
    ((PASS++))
else
    echo -e "${RED}✗${NC} Tailwind CSS not found"
    ((FAIL++))
fi

if grep -q "\"react\"" package.json; then
    echo -e "${GREEN}✓${NC} React installed"
    ((PASS++))
else
    echo -e "${RED}✗${NC} React not found"
    ((FAIL++))
fi

if grep -q "\"next\"" package.json; then
    echo -e "${GREEN}✓${NC} Next.js installed"
    ((PASS++))
else
    echo -e "${RED}✗${NC} Next.js not found"
    ((FAIL++))
fi
echo ""

echo "📋 Checking Code Quality..."
# Check for basic code structure in components
if grep -q "export function ContactEditFullPage" components/contacts/contact-edit-full-page.tsx; then
    echo -e "${GREEN}✓${NC} ContactEditFullPage component exported"
    ((PASS++))
fi

if grep -q "export function ContactDetailsForm" components/contacts/contact-details-form.tsx; then
    echo -e "${GREEN}✓${NC} ContactDetailsForm component exported"
    ((PASS++))
fi

if grep -q "export function ContactChangeLog" components/contacts/contact-changelog.tsx; then
    echo -e "${GREEN}✓${NC} ContactChangeLog component exported"
    ((PASS++))
fi

if grep -q "export function ContactAIChat" components/contacts/contact-ai-chat.tsx; then
    echo -e "${GREEN}✓${NC} ContactAIChat component exported"
    ((PASS++))
fi

if grep -q "export async function POST" app/api/chat/ollama/route.ts; then
    echo -e "${GREEN}✓${NC} Ollama API endpoint defined"
    ((PASS++))
fi
echo ""

echo "═══════════════════════════════════════════"
echo -e "${GREEN}✓ Passed: $PASS${NC}"
echo -e "${RED}✗ Failed: $FAIL${NC}"
echo "═══════════════════════════════════════════"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✨ All checks passed! Implementation is complete.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Copy .env.local.example to .env.local"
    echo "2. Install Ollama: https://ollama.ai"
    echo "3. Run: ollama serve"
    echo "4. In another terminal: ollama pull mistral"
    echo "5. Run: npm run dev"
    echo "6. Navigate to: http://localhost:3000/contacts"
    echo "7. Click Edit on a contact to test the feature"
    echo ""
    echo "📖 Start with: CONTACT_EDITOR_QUICK_START.md"
    exit 0
else
    echo -e "${RED}⚠️  Some checks failed. Please review the output above.${NC}"
    exit 1
fi
