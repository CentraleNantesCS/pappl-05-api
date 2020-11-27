import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Period from 'App/Models/Period'

export default class PeriodsController {
  /**
   * index
   */
  public async index({ auth }: HttpContextContract) {
    await auth.authenticate()
    //
    const periods = await Period.all()

    return periods
  }
}
