// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class EmailsController {
  public async sendWelcomeEmail(user) {
    console.log('Sending email to ' + user.email)
    await Mail.send((message) => {
      message
        .from('info@lukee.io')
        .to(user.email)
        .subject('Bienvenue sur Notre Plateforme !')
        .htmlView('emails/test', { user })
    })
    console.log('Email sent to ' + user.email)
  }
}
