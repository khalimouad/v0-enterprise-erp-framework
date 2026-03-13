import { NextRequest, NextResponse } from "next/server"

// Demo suggestions when Ollama is unavailable
const DEMO_SUGGESTIONS: Record<string, string> = {
  "en stock": "D'après nos informations, le produit A1 est actuellement en stock avec 15 unités disponibles au dépôt principal. Vérifiez auprès de l'équipe logistique pour toute réservation urgente.",
  "credit": "Le client dispose d'une limite de crédit de 50,000 MAD et a actuellement 35,000 MAD en encours. Il reste 15,000 MAD disponibles.",
  "paiement": "Les 3 dernières commandes ont été payées à temps. Délai moyen de paiement: 12 jours. Pas de problème de trésorerie détecté.",
  "conditions": "Les conditions actuelles sont Net 30. Compte tenu du statut VIP, une réduction de 5% a été appliquée sur la dernière facture.",
  "default": "Je peux vous aider avec des informations sur ce contact. Assurez-vous qu'Ollama est en cours d'exécution localement pour des réponses IA complètes: `ollama serve` sur localhost:11434.",
}

export async function POST(request: NextRequest) {
  try {
    const { question, context, conversationHistory } = await request.json()

    // Default Ollama endpoint
    const ollamaUrl = process.env.OLLAMA_API_URL || "http://localhost:11434/api/generate"

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
    let systemPrompt = `Tu es un assistant ERP. ${minimalContext}`
    
    // Add recent conversation context only (last 3 messages max)
    let conversationContext = ""
    if (conversationHistory && conversationHistory.length > 0) {
      const recent = conversationHistory.slice(-3)
      recent.forEach((msg: any) => {
        const role = msg.type === "user" ? "Utilisateur" : "IA"
        conversationContext += `\n${role}: ${msg.content}`
      })
    }

    // Final optimized prompt
    const prompt = `${systemPrompt}${conversationContext}\n\nUtilisateur: ${question}\n\nIA (réponse courte):`

    console.log("[v0] Ollama prompt length:", prompt.length)

    let fullResponse = ""

    try {
      const ollamaResponse = await fetch(ollamaUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: process.env.OLLAMA_MODEL || "mistral",
          prompt: prompt,
          stream: false,
          temperature: 0.6,
          top_k: 30,
          top_p: 0.85,
          num_predict: 200, // Limit response length
        }),
      })

      if (!ollamaResponse.ok) {
        throw new Error(`Ollama API error: ${ollamaResponse.status}`)
      }

      const data = await ollamaResponse.json()
      fullResponse = data.response || "Désolé, je n'ai pas pu générer de réponse."
    } catch (ollamaError) {
      console.error("[v0] Ollama connection error:", ollamaError)
      
      // Provide demo response based on question content
      const questionLower = question.toLowerCase()
      let demoResponse = DEMO_SUGGESTIONS.default

      for (const [key, response] of Object.entries(DEMO_SUGGESTIONS)) {
        if (key !== "default" && questionLower.includes(key)) {
          demoResponse = response
          break
        }
      }

      fullResponse = `[DEMO MODE] ${demoResponse}`
    }

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
