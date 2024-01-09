import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IsAdmin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (auth.user && auth.user.role === 'admin') {
      await next()
    } else {
      return response.unauthorized('Accès non autorisé')
    }
  }
}
