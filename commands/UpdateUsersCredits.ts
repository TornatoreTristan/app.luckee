import { BaseCommand } from '@adonisjs/core/build/standalone'
import User from 'App/Models/User'

export default class UpdateUserCredits extends BaseCommand {
  public static commandName = 'updateUserCredits'

  public static description = 'Update user credits daily'

  public async run() {
    this.logger.info('Updating user credits...')

    await User.query().update({ credits: 10 })

    this.logger.success('User credits updated successfully!')
  }
}
