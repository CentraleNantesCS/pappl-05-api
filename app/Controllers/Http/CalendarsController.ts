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
}
