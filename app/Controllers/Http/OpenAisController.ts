// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import OpenAI from 'openai'

class OpenAIController {
  public async generateText({ request, response }) {
    const prompt = request.input('prompt')
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Assurez-vous que la clé API est stockée de manière sécurisée
    })

    console.log(`Prompt: ${prompt}`)

    try {
      const openAIResponse = await openai.completions.create({
        model: 'text-davinci-003', // ou un autre modèle selon votre besoin
        prompt: prompt,
        max_tokens: 150,
      })

      return response.json(openAIResponse)
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Erreur lors de la communication avec OpenAI', error })
    }
  }
}

module.exports = OpenAIController
