import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import Inertia from '@ioc:EidelLev/Inertia'

export default class ShareUserPosts {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const { auth } = ctx

    if (auth.user) {
      try {
        const posts = await Post.query().where('userId', auth.user.id).orderBy('created_at', 'desc')
        Inertia.share({ posts: posts })
      } catch (error) {
        console.error('Erreur lors de la récupération des posts :', error)
        // Gérer l'erreur de manière appropriée
      }
    }

    await next()
  }
}
