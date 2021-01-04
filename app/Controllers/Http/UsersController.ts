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
  public async store({ auth, request }: HttpContextContract) {
    await auth.authenticate()

    const { firstname, lastname, email, acronym, password } = request.only([
      'firstname',
      'lastname',
      'email',
      'acronym',
      'password',
    ])

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      acronym,
      password,
    })

    return newUser
  }

  /**
   * Update
   */
  public async update({ auth }: HttpContextContract) {
    await auth.authenticate()
    // TODO
    return
  }

  /**
   * Delete
   */
  public async destroy({ auth, params, response }: HttpContextContract) {
    await auth.authenticate()

    if (!params?.id) {
      return response.status(404)
    }

    const user = await User.findOrFail(params.id)
    await user.delete()

    return response.status(200).send(null)
  }
}
