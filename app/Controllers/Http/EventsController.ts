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

  public async store({ auth, request, response }: HttpContextContract) {
    await auth.authenticate()

    const { startDate, endDate, eventTypeId, remote, subjectId, calendarId } = request.only([
      'startDate',
      'endDate',
      'eventTypeId',
      'remote',
      'subjectId',
      'calendarId',
    ])

    // TODO: check if IDs are valid

    // Create event
    const newEvent = new Event()

    newEvent.start = startDate
    newEvent.end = endDate
    newEvent.remote = remote
    // associate event type
    newEvent.event_type_id = eventTypeId
    // associate event subject
    newEvent.subject_id = subjectId
    // associate event subject
    newEvent.calendar_id = calendarId

    await newEvent.save()

    return response.status(201).send(null)
  }
  public async update({ auth, request, params, response }: HttpContextContract) {
    await auth.authenticate()

    const { startDate, endDate, eventTypeId, remote, subjectId, calendarId } = request.only([
      'startDate',
      'endDate',
      'eventTypeId',
      'remote',
      'subjectId',
      'calendarId',
    ])

    // TODO: check if IDs are valid

    // update event
    await Event.updateOrCreate(
      { id: params.id },
      {
        start: startDate,
        end: endDate,
        remote,
        event_type_id: eventTypeId,
        subject_id: subjectId,
        calendar_id: calendarId, // unecessary
      }
    )

    return response.status(200).send(null)
  }
  public async destroy({ auth, params, response }: HttpContextContract) {
    await auth.authenticate()

    if (!params?.id) {
      return response.status(404)
    }

    const event = await Event.findOrFail(params.id)
    await event.delete()

    return response.status(200).send(null)
  }
}
