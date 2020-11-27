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
}
