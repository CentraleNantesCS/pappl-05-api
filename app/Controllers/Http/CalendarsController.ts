import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'

import Calendar from 'App/Models/Calendar'
import EventType from 'App/Models/EventType'
import ExcelExport from 'App/Services/ExcelExport'

export default class CalendarsController {
  /**
   * index
   */
  public async index({ auth }: HttpContextContract) {
    await auth.authenticate()
    const calendars = await Calendar.query().preload('classe').preload('specialisation')

    return calendars
  }

  /**
   * single calendar
   */
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

  /**
   * Export
   */
  public async export({ auth, params, response }: HttpContextContract) {
    const calendarID = params?.id ?? null

    if (!calendarID) {
      response.status(404).send(null)
    }

    const path = Application.tmpPath(`export-${new Date().getTime()}.xlxs`)
    await ExcelExport.export(calendarID, path)

    return response.attachment(path, `Export #${calendarID}.xlsx`)
  }

  /**
   * Store
   */
  public async store({ auth, request }: HttpContextContract) {
    await auth.authenticate()

    const { classe, specialisation } = request.only(['classe', 'specialisation'])

    await Calendar.create({
      classe_id: classe,
      specialisation_id: specialisation,
    })

    return
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

    const calendar = await Calendar.findOrFail(params.id)
    await calendar.delete()

    return response.status(200).send(null)
  }
}
