import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'

export default class EventsController {
  /**
   * index
   */
  public async index({ auth }: HttpContextContract) {
    await auth.authenticate()
    //
    const events = await Event.all()

    return events
  }
}
