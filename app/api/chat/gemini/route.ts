import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { question, context, conversationHistory } = await request.json()

    // Get Gemini API key from environment
    const geminiApiKey = process.env.GEMINI_API_KEY
    if (!geminiApiKey) {
      return NextResponse.json(
        {
          error: "Gemini API key is not configured",
          success: false,
        },
        { status: 500 }
      )
    }

    // Build efficient, minimal context (only essential fields)
    const buildContext = () => {
      const fields = []
      
      if (context?.contactName) fields.push(`Contact: ${context.contactName}`)
      if (context?.type) fields.push(`Type: ${context.type}`)
      if (context?.status) fields.push(`Statut: ${context.status}`)
      if (context?.tags?.length) fields.push(`Étiquettes: ${context.tags.join(", ")}`)
      
      return fields.join(" | ")
    }

    const minimalContext = buildContext()

    // Build short prompt (tokens-optimized)
    let systemPrompt = `Tu es un assistant ERP français. ${minimalContext}`
    
    // Add recent conversation context only (last 3 messages max)
    let conversationContext = ""
    if (conversationHistory && conversationHistory.length > 0) {
      const recent = conversationHistory.slice(-3)
      recent.forEach((msg: any) => {
        const role = msg.type === "user" ? "Utilisateur" : "Assistant"
        conversationContext += `\n${role}: ${msg.content}`
      })
    }

    // Final optimized prompt
    const prompt = `${systemPrompt}${conversationContext}\n\nUtilisateur: ${question}\n\nAssistant (réponse courte):`

    console.log("[v0] Gemini prompt length:", prompt.length)

    // Call Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.6,
            topK: 30,
            topP: 0.85,
            maxOutputTokens: 200,
          },
        }),
      }
    )

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json()
      console.error("[v0] Gemini API error:", errorData)
      throw new Error(`Gemini API error: ${geminiResponse.status}`)
    }

    const data = await geminiResponse.json()
    
    // Extract the response text from Gemini's response structure
    let fullResponse = "Désolé, je n'ai pas pu générer de réponse."
    
    if (data.candidates && data.candidates.length > 0) {
      const content = data.candidates[0].content
      if (content && content.parts && content.parts.length > 0) {
        fullResponse = content.parts[0].text
      }
    }

    console.log("[v0] Gemini response received successfully")

    return NextResponse.json({
      response: fullResponse.trim(),
      success: true,
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json(
      {
        error: "Erreur lors du traitement du message",
        success: false,
      },
      { status: 500 }
    )
  }
}
