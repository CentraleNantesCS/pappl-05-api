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

  public async store({ auth }: HttpContextContract) {
    await auth.authenticate()
    // TODO
    return
  }
  public async update({ auth }: HttpContextContract) {
    await auth.authenticate()
    // TODO
    return
  }
  public async delete({ auth }: HttpContextContract) {
    await auth.authenticate()

    if (!params?.id) {
      return response.status(404)
    }

    const event = await Event.findOrFail(params.id)
    await event.delete()

    return response.status(200).send()
  }
}
