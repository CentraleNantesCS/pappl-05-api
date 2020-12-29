import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Class from 'App/Models/Class'

export default class ClassSeeder extends BaseSeeder {
  public async run() {
    await Class.create({
      start_year: new Date().getFullYear(),
      end_year: new Date().getFullYear() + 1,
    })
  }
}
