import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Period from 'App/Models/Period'

export default class PeriodsController {
  /**
   * index
   */
  public async index({ auth }: HttpContextContract) {
    await auth.authenticate()
    //
    const periods = await Period.all()

    return periods
  }
  /**
   * Store
   */
  public async store({ auth, request }: HttpContextContract) {
    await auth.authenticate()

    const { start, end } = request.only(['start', 'end'])

    const period = await Period.create({
      start,
      end,
    })

    return period
  }

  /**
   * Update
   */
  public async update({ auth, request, params, response }: HttpContextContract) {
    await auth.authenticate()

    if (!params?.id) {
      return response.status(422).send('Missing param.')
    }

    const { start, end } = request.only(['start', 'end'])
    const period = await Period.findOrFail(params.id)

    period.start = start
    period.end = end

    await period.save()

    return period
  }

  /**
   * Delete
   */
  public async destroy({ auth, params, response }: HttpContextContract) {
    await auth.authenticate()

    if (!params?.id) {
      return response.status(404)
    }

    const period = await Period.findOrFail(params.id)
    await period.delete()

    return response.status(200).send()
  }
}
