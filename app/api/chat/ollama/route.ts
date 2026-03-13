import { NextRequest, NextResponse } from "next/server"

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
      fullResponse =
        "Je ne peux pas me connecter au service IA. Assurez-vous qu'Ollama est en cours d'exécution localement (http://localhost:11434). Démarrez-le avec: `ollama serve`"
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
