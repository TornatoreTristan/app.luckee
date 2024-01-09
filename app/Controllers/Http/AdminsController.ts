import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AdminsController {
  public async getAllUser({ inertia }: HttpContextContract) {
    const users = await User.all()
    console.log(users)
    return inertia.render('Admin', { users })
  }
}
