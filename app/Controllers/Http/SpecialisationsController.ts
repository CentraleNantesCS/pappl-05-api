import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Specialisation from 'App/Models/Specialisation'

export default class SpecialisationsController {
  /**
   * index
   */
  public async index({ auth }: HttpContextContract) {
    await auth.authenticate()
    //
    const specialisations = await Specialisation.all()

    return specialisations
  }

  /**
   * Store
   */
  public async store({ auth, request }: HttpContextContract) {
    await auth.authenticate()

    const { title, acronym, subjects } = request.only(['title', 'acronym', 'subjects'])

    const specialisation = await Specialisation.create({
      name,
      acronym,
    })

    if (subjects.length > 0) {
      await specialisation.related('subjects').attach([...subjects])
    }

    return await specialisation.preload('subjects')
  }

  /**
   * Update
   */
  public async update({ auth, request, params, response }: HttpContextContract) {
    await auth.authenticate()

    if (!params?.id) {
      return response.status(422).send('Missing params.')
    }
    const { title, acronym, subjects } = request.only(['title', 'acronym', 'subjects'])
    const specialisation = await Specialisation.findOrFail(params.id)

    specialisation.name = name
    specialisation.acronym = acronym

    await specialisation.save()

    return specialisation
  }

  /**
   * Delete
   */
  public async delete({ auth, params, response }: HttpContextContract) {
    await auth.authenticate()

    if (!params?.id) {
      return response.status(404)
    }

    const specialisation = await Specialisation.findOrFail(params.id)
    await specialisation.delete()

    return response.status(200).send()
  }
}
