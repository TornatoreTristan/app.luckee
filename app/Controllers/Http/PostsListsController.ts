import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsListsController {
  public async getPosts({ auth, inertia }: HttpContextContract) {
    const user = auth.user
    if (user) {
      const posts = await Post.query().where('userId', user.id).orderBy('created_at', 'desc')
      return inertia.render('PostsList', {
        posts,
      })
    }
  }
}
