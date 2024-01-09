import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Post from 'App/Models/Post'

export default class AdminsController {
  public async getAllUser({ inertia }: HttpContextContract) {
    const posts = await Post.all()
    const users = await User.all()
    return inertia.render('Admin', { users, posts })
  }
}
