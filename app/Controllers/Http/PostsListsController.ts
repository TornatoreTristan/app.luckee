import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsListsController {
  public async index({ auth, inertia }: HttpContextContract) {
    const user = await auth.authenticate()
    const posts = await Post.query().where('userId', user.id).orderBy('created_at', 'desc')

    return inertia.render('PostsList', { posts })
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const post = await Post.findOrFail(params.id)
      post.merge(request.only(['title', 'content', 'publishDate', 'status']))

      // Gestion de l'upload d'image
      const imageFile = request.file('image', {
        size: '2mb',
        extnames: ['jpg', 'jpeg', 'png'],
      })

      if (imageFile) {
        const fileName = `${new Date().getTime()}.${imageFile.extname}`
        await imageFile.move(Application.tmpPath('uploads'), {
          name: fileName,
        })

        // Enregistrer le chemin de l'image dans la base de données
        post.image = `/uploads/${fileName}`
      }

      await post.save()

      return response.ok({ message: 'Post updated successfully', post })
    } catch (error) {
      return response.badRequest({ message: 'Unable to update post', error })
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const post = await Post.findOrFail(params.id)
      await post.delete()

      return response.ok({ success: true })
    } catch (error) {
      return response.notFound({ success: false, message: 'Post not found' })
    }
  }
}
