import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'

export default class AuthController {
  public async Register({ auth, request, response }: HttpContextContract) {
    const { email, password, firstName, lastName } = request.only([
      'email',
      'password',
      'firstName',
      'lastName',
    ])
    const user = new User()
    user.email = email
    user.password = password
    user.first_name = firstName
    user.last_name = lastName
    await user.save()
    await auth.login(user)
    return response.ok({ user: user, isLoggedIn: true })
  }

  public async Login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    await auth.use('web').attempt(email, password)
    return response.ok({ user: auth.user, isLoggedIn: auth.isLoggedIn })
  }

  public async getUserData({ auth, response }: HttpContextContract) {
    return response.ok({ user: auth.user, isLoggedIn: auth.isLoggedIn })
  }
}
