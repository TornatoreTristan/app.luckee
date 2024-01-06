import OpenAI from 'openai'
import Post from 'App/Models/Post'

export default class OpenAisController {
  private isGenerating = false
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
  private async savePost(content, userId, prompt, modelUsed, idea, tone) {
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
        status: 'draft',
        slug,
        image: '',
        prompt,
        idea,
        tone,
        model: modelUsed,
      })
      await newPost.save()
      return newPost
    } catch (error) {
      console.error('Erreur lors de l’enregistrement du post:', error)
      throw error
    }
  }

  public async generateText({ request, response, auth }) {
    if (this.isGenerating) {
      return response
        .status(429)
        .send('Un processus de génération est déjà en cours. Veuillez réessayer plus tard.')
    }

    this.isGenerating = true

    response.response.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    })
    const { prompt, pronom, model, tone, idea } = request.all()

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
          content: `
        Tu es redacteur de publicagtion Linkedin, tu es crée des publications parfaitement virales à partir de simples indications. Tu respectes le processus suivant pour rédiger tes publications : \n\n 1. Analyse des indications Définir le sujet principal de l\'article. Identifier le problème à résoudre ou le point de discussion principal. Déterminer le public cible de l\'article. Choisir le ton de voix à adopter (inspirant, provocateur, informatif, autobiographique, etc.). Formuler une accroche captivante pour démarrer l\'article. \n\n 2.Élaboration du contenu : Relater une histoire ou une expérience personnelle si cela convient au ton et au sujet. Les histoires personnelles suscitent l\'émotion et l\'engagement. Utiliser des listes ou des énumérations pour hiérarchiser les points ou pour offrir une lecture facile. Inclure des éléments visuels comme des emojis, des caractères gras ou italiques, ou des sauts de ligne pour rendre le contenu attrayant et facile à lire. Mettre en avant des phrases impactantes qui peuvent servir de citations ou de moments de réflexion pour le lecteur. \n\n 3. Inclusion d\'un appel à l\'action ou d\'une conclusion : Inciter les lecteurs à réfléchir, à partager leur propre expérience, à commenter, ou à partager le post. Résumer le message clé ou la leçon principale à retenir.\n\n 4.Révision et ajustement : Relire le post pour s\'assurer de sa fluidité et de sa cohérence. Vérifier que le contenu correspond bien aux indications fournies et ajuster si nécessaire. \n\n 5.Livraison : Fournir le post finalisé, prêt à être publié sur LinkedIn. Ce que tu n'as pas le droit de faire : Saluer les gens, dire bonjour ... . Te présenter. Faire des fautes d'orthographe. Faire des fautes de grammaire. Faire des fautes de syntaxe. Faire des fautes de ponctuation. Faire des fautes de conjugaison. Faire des fautes de typographie. Faire des fautes de frappe.
                `,
        },
        {
          role: 'user',
          content: `Rédige moi une publication LinkedIn prete à poster sur le thème ${prompt}. Voici le contexte que tu développeras dans la publication ${idea}. Tu utiliseras le ${pronom}. Enfin, ta publication devra être sur le ton ${tone}.`,
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

    await this.savePost(content, userId, prompt, model, idea, tone) // Enregistrement du post
    this.isGenerating = false
  }
}
