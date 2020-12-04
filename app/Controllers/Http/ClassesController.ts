import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Class from 'App/Models/Class'

export default class ClassesController {
  /**
   * index
   */
  public async index({ auth }: HttpContextContract) {
    await auth.authenticate()
    //
    const classes = await Class.all()

    return classes
  }

  /**
   * Store
   */
  public async store({ auth, request }: HttpContextContract) {
    await auth.authenticate()

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { start_year, end_year } = request.only(['start_year', 'end_year'])

    const promo = await Class.create({
      start_year,
      end_year,
    })

    return promo
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
    const { start_year, end_year } = request.only(['start_year', 'end_year'])
    const promo = await Class.findOrFail(params.id)

    promo.start_year = start_year
    promo.end_year = end_year

    await promo.save()

    return promo
  }

  /**
   * Delete
   */
  public async delete({ auth, params, response }: HttpContextContract) {
    await auth.authenticate()

    if (!params?.id) {
      return response.status(404)
    }

    const promo = await Class.findOrFail(params.id)
    await promo.delete()

    return response.status(200).send()
  }
}
