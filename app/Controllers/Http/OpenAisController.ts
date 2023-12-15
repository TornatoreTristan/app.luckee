import OpenAI from 'openai'
import Post from 'App/Models/Post'

export default class OpenAisController {
  // Méthode pour générer un titre à partir du contenu
  private generateTitle(content) {
    const endingCharacters = ['.', '!', '?']
    for (let i = 0; i < content.length; i++) {
      if (endingCharacters.includes(content[i])) {
        return content.substring(0, i + 1)
      }
    }
    return content // Retourne le contenu complet si aucun caractère de fin n'est trouvé
  }

  // Méthode pour enregistrer une publication dans la base de données
  private async savePost(content, userId, prompt, modelUsed) {
    try {
      const title = this.generateTitle(content)
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      const newPost = new Post()
      newPost.fill({
        title,
        content,
        userId,
        status: 'draft', // Changez selon vos besoins
        slug,
        image: '', // À définir selon la logique de votre application
        prompt,
        model: modelUsed,
      })
      await newPost.save()
      return newPost
    } catch (error) {
      console.error('Erreur lors de l’enregistrement du post:', error)
      throw error // Ou gérez l'erreur selon votre logique d'application
    }
  }

  public async generateText({ request, response, auth }) {
    response.response.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    })
    const { prompt, pronom, model } = request.all()
    console.log(prompt, pronom, model)

    const modelToUse = (model) => {
      switch (model) {
        case 'gpt-3':
          return 'gpt-3.5-turbo-0613'
        case 'gpt-4':
          return 'gpt-4'
        case 'luckee-ft':
          return 'ft:gpt-3.5-turbo-0613:tristan-tornatore::81a0sIpH'
      }
    }

    const openai = process.env.OPENAI_API_KEY
      ? // @ts-ignore
        new OpenAI(String(process.env.OPENAI_API_KEY))
      : null
    const stream = await openai?.chat.completions.create({
      model: modelToUse(model) as
        | 'gpt-3.5-turbo-0613'
        | 'gpt-4'
        | 'ft:gpt-3.5-turbo-0613:tristan-tornatore::81a0sIpH',
      messages: [
        {
          role: 'system',
          content: `Tu es Luckee, un expert du Personal Branding. Ton rôle est de livrer des publications prête à poster pour LinkdIn avec les informations et le contexte que te donne l'utilisateur. Tu es crétif et tu cherches à créer des publications virales. Tu peux utliser des emoticons et pense à rendre la publication lisible ave une accroche irresistible et des sauts de lignes.`,
        },
        {
          role: 'user',
          content: `Rédige moi une publication LinkedIn prete à poster sur le thème ${prompt}. Tu utiliseras le ${pronom}.`,
        },
      ],
      stream: true,
    })
    if (!stream) {
      return response.badRequest({ error: 'erreur' })
    }
    let content = ''
    for await (const chunk of stream) {
      content += chunk.choices[0]?.delta?.content || ''
      const formattedContent = `data: ${JSON.stringify(content)}\n\n`
      response.response.write(formattedContent)
    }

    const user = auth.user
    const userId = user?.id

    await this.savePost(content, userId, prompt, model) // Enregistrement du post
  }
}
