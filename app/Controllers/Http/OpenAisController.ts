import OpenAI from 'openai'

export default class OpenAisController {
  public async generateText({ request, response }) {
    response.response.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    })
    const prompt = request.input('prompt')
    const openai = process.env.OPENAI_API_KEY
      ? // @ts-ignore
        new OpenAI(String(process.env.OPENAI_API_KEY))
      : null
    const stream = await openai?.chat.completions.create({
      model: 'ft:gpt-3.5-turbo-0613:tristan-tornatore::81a0sIpH',
      messages: [
        { role: 'user', content: `rédige moi une publication linkedIn sur ce sujet ${prompt}` },
      ],
      stream: true,
    })
    if (!stream) {
      return response.badRequest({ error: 'erreur' })
    }
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || ''
      // Assurez-vous que le texte est encodé correctement
      const formattedContent = `data: ${JSON.stringify(content)}\n\n`
      response.response.write(formattedContent)
    }
  }
}
