import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Calendar from 'App/Models/Calendar'

export default class CalendarsController {
  /**
   * index
   */
  public async index({ auth }: HttpContextContract) {
    await auth.authenticate()
    //
    const calendars = await Calendar.query().preload('classe').preload('specialisation')

    return calendars
  }

  public async store({ auth, request }: HttpContextContract) {
    await auth.authenticate()

    const { classe, specialisation } = request.only(['classe', 'specialisation'])

    await Calendar.create({
      classe_id: classe,
      specialisation_id: specialisation,
    })

    return
  }
  public async update({ auth }: HttpContextContract) {
    await auth.authenticate()
    return
  }
  public async delete({ auth }: HttpContextContract) {
    await auth.authenticate()
    return
  }
}
