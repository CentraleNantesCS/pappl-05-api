import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async currentUser({ auth }: HttpContextContract) {
    await auth.authenticate()

    return auth.user
  }

  /**
   * index
   */
  public async index({ auth }: HttpContextContract) {
    await auth.authenticate()
    //
    const users = await User.all()

    return users
  }
}
