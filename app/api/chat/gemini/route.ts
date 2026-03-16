import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { question, context, conversationHistory, purpose = "chat", userPermissions = "all" } = await request.json()

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

    // Build context based on purpose
    let systemPrompt = ""
    let maxTokens = 200

    switch (purpose) {
      case "suggestion":
        systemPrompt = `Tu es un assistant IA intelligent pour la gestion des contacts. 
        Fournis des suggestions intelligentes et des idées pour aider l'utilisateur.
        Contexte actuel: Contact: ${context?.contactName || "aucun"} | Type: ${context?.type || "inconnu"} | Statut: ${context?.status || "inconnu"} | Étiquettes: ${context?.tags?.join(", ") || "aucune"}
        Utilisateur: ${userPermissions}
        Sois concis, actionnable et pratique. Format: liste numérotée si applicable.`
        maxTokens = 300
        break

      case "search":
        systemPrompt = `Tu es un assistant de recherche pour une base de données de contacts.
        Aide l'utilisateur à trouver des contacts pertinents basés sur sa requête.
        Base de données: Contacts avec champs: nom, email, téléphone, type, statut, région, ville, pays, secteur d'activité
        Permissions utilisateur: ${userPermissions}
        Retourne des suggestions de recherche et des filtres pertinents.
        Requête: ${question}`
        maxTokens = 250
        break

      default: // "chat"
        systemPrompt = `Tu es un assistant ERP français pour la gestion des contacts d'entreprise.
        Contexte: Contact: ${context?.contactName || "aucun"} | Type: ${context?.type || "inconnu"} | Statut: ${context?.status || "inconnu"} | Étiquettes: ${context?.tags?.join(", ") || "aucune"}
        Utilisateur: ${userPermissions}
        Sois utile et adapté au contexte.`
    }

    // Add recent conversation context only (last 2 messages max for token efficiency)
    let conversationContext = ""
    if (conversationHistory && conversationHistory.length > 0) {
      const recent = conversationHistory.slice(-2)
      recent.forEach((msg: any) => {
        const role = msg.type === "user" ? "Utilisateur" : "Assistant"
        conversationContext += `\n${role}: ${msg.content}`
      })
    }

    // Final optimized prompt
    const prompt = `${systemPrompt}${conversationContext}\n\nUtilisateur: ${question}\n\nAssistant (réponse rapide):`

    console.log("[v0] Gemini request - Purpose:", purpose, "- Token estimate:", Math.ceil(prompt.length / 4))

    // Call Gemini API with latest Flash model
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
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
            temperature: purpose === "suggestion" ? 0.8 : 0.6,
            topK: 30,
            topP: 0.85,
            maxOutputTokens: maxTokens,
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

    console.log("[v0] Gemini response received successfully for purpose:", purpose)

    return NextResponse.json({
      response: fullResponse.trim(),
      success: true,
      purpose: purpose,
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
