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
}
