import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async currentUser({ auth }: HttpContextContract) {
    await auth.authenticate()

    return auth.user
  }
}
