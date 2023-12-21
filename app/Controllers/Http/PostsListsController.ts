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

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params
    const publishDate = request.input('publishDate')
    const status = request.input('status')
    const post = await Post.findOrFail(id)
    post.publishAt = publishDate
    post.status = status
    await post.save()
    return response.ok({ success: true })
  }

  public async delete({ params, response }: HttpContextContract) {
    const { id } = params
    const post = await Post.findOrFail(id)
    await post.delete()
    return response.ok({ success: true })
  }
}
