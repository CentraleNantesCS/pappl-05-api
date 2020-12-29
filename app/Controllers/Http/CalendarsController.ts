import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Calendar from 'App/Models/Calendar'
import EventType from 'App/Models/EventType'

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

  public async show({ auth, params, response }: HttpContextContract) {
    await auth.authenticate()
    const calendarID = params?.id ?? null

    if (!calendarID) {
      response.status(404).send(null)
    }

    const calendar = await Calendar.query()
      .where('id', calendarID)
      .preload('classe')
      .preload('specialisation')
      .preload('events', (query) => {
        query.preload('subject').preload('eventType').preload('host')
      })
      .first()

    return calendar
  }

  public async getEventTypes({ auth }: HttpContextContract) {
    await auth.authenticate()
    //
    const eventTypes = await EventType.query()

    return eventTypes
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
