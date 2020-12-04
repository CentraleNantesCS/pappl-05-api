// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Calendar from 'App/Models/Calendar'

export default class CalendarsController {
  /**
   * index
   */
  public async index({ auth }: HttpContextContract) {
    await auth.authenticate()
    //
    const calendars = await Calendar.all()

    return calendars
  }
  public async store({ auth }: HttpContextContract) {
    await auth.authenticate()
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
