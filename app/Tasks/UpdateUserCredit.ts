import { BaseTask } from 'adonis5-scheduler/build'
import User from 'App/Models/User'

export default class UpdateUserCredits extends BaseTask {
  public static get schedule() {
    // return '*/30 * * * * *'
    return '0 0 * * *'
  }

  public static get useLock() {
    return true
  }

  public async handle() {
    console.log('Running UpdateUserCredits task')
    await User.query().update({ credits: 10 })
  }
}
