import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        firstname: 'Machin',
        lastname: 'Bidul',
        email: 'admin@admin.fr',
        password: 'password',
      },
    ])
  }
}
