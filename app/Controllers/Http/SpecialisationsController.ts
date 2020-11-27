import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Specialisation from 'App/Models/Specialisation'

export default class SpecialisationsController {
  /**
   * index
   */
  public async index({ auth }: HttpContextContract) {
    await auth.authenticate()
    //
    const specialisations = await Specialisation.all()

    return specialisations
  }
}
