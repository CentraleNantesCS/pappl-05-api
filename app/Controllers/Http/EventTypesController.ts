import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EventType from 'App/Models/EventType'

export default class EventTypesController {
  /**
   * index
   */
  public async index({ auth }: HttpContextContract) {
    await auth.authenticate()
    //
    const eventTypes = await EventType.all()

    return eventTypes
  }

  /**
   * Store
   */
  public async store({ auth, request }: HttpContextContract) {
    await auth.authenticate()

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { name, acronym } = request.only(['name', 'acronym'])

    const type = await EventType.create({
      name,
      acronym,
    })

    return type
  }

  /**
   * Update
   */
  public async update({ auth, request, params, response }: HttpContextContract) {
    await auth.authenticate()

    if (!params?.id) {
      return response.status(422).send('Missing param.')
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { name, acronym } = request.only(['name', 'acronym'])
    const type = await EventType.findOrFail(params.id)

    type.name = name
    type.acronym = acronym

    await type.save()

    return type
  }

  /**
   * Delete
   */
  public async delete({ auth, params, response }: HttpContextContract) {
    await auth.authenticate()

    if (!params?.id) {
      return response.status(404)
    }

    const type = await EventType.findOrFail(params.id)
    await type.delete()

    return response.status(200).send()
  }
}
