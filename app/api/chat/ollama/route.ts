import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, contact, conversationHistory } = await request.json()

    // Default Ollama endpoint (localhost by default)
    const ollamaUrl = process.env.OLLAMA_API_URL || "http://localhost:11434/api/generate"

    // Create context from contact data
    const contactContext = `
Contact Information:
- Name: ${contact.name}
- Type: ${contact.type || "N/A"}
- Status: ${contact.status || "N/A"}
- Email: ${contact.email}
- Phone: ${contact.phone}
- Address: ${contact.address || "N/A"}, ${contact.city || ""}, ${contact.country || ""}
- Industry: ${contact.industry || "N/A"}
- Website: ${contact.website || "N/A"}
- Currency: ${contact.currency || "USD"}
- Payment Terms: ${contact.paymentTerms || "N/A"}
- Customer Rank: ${contact.customerRank || "N/A"}
- Supplier Rank: ${contact.supplierRank || "N/A"}
- Tags: ${contact.tags?.join(", ") || "N/A"}

You are a helpful business assistant for an ERP system. Answer questions about this contact and provide insights based on the information provided. Be professional and concise.
`

    // Build conversation context from history
    let conversationContext = contactContext + "\n\nPrevious conversation:"
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.forEach((msg: any) => {
        conversationContext += `\n${msg.type === "user" ? "User" : "Assistant"}: ${msg.content}`
      })
    }

    const prompt = `${conversationContext}\n\nUser: ${message}\n\nAssistant:`

    // Call Ollama API with streaming
    let fullResponse = ""

    try {
      const ollamaResponse = await fetch(ollamaUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OLLAMA_MODEL || "llama2",
          prompt: prompt,
          stream: false,
          temperature: 0.7,
          top_k: 40,
          top_p: 0.9,
        }),
      })

      if (!ollamaResponse.ok) {
        throw new Error(`Ollama API error: ${ollamaResponse.status}`)
      }

      const data = await ollamaResponse.json()
      fullResponse = data.response || "I apologize, but I couldn't generate a response."
    } catch (ollamaError) {
      console.error("[v0] Ollama connection error:", ollamaError)
      // Return a helpful message if Ollama is not available
      fullResponse =
        "I'm unable to connect to the AI service. Please make sure Ollama is running locally (typically on http://localhost:11434). You can start it with: `ollama serve`\n\nFor now, I can still help you with manual analysis of the contact information."
    }

    return NextResponse.json({
      response: fullResponse.trim(),
      success: true,
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json(
      {
        error: "Failed to process chat message",
        success: false,
      },
      { status: 500 }
    )
  }
}
