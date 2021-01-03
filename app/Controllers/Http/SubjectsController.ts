import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subject from 'App/Models/Subject'

export default class SubjectsController {
  /**
   * index
   */
  public async index({ auth }: HttpContextContract) {
    await auth.authenticate()
    //
    const subjects = await Subject.all()

    return subjects
  }

  /**
   * Store
   */
  public async store({ auth, request }: HttpContextContract) {
    await auth.authenticate()

    const { name, acronym } = request.only(['name', 'acronym'])

    const subject = await Subject.create({
      name,
      acronym,
    })

    return subject
  }

  /**
   * Update
   */
  public async update({ auth, request, params, response }: HttpContextContract) {
    await auth.authenticate()

    if (!params?.id) {
      return response.status(422).send('Missing params.')
    }
    const { name, acronym } = request.only(['name', 'acronym'])
    const subject = await Subject.findOrFail(params.id)

    subject.name = name
    subject.acronym = acronym

    await subject.save()

    return subject
  }

  /**
   * Delete
   */
  public async destroy({ auth, params, response }: HttpContextContract) {
    await auth.authenticate()

    if (!params?.id) {
      return response.status(404)
    }

    const subject = await Subject.findOrFail(params.id)
    await subject.delete()

    return response.status(200).send()
  }
}
