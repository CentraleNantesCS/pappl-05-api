import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    await Role.createMany([
      {
        name: 'administrator',
        display_name: 'Administrateur',
      },
      {
        name: 'manager',
        display_name: "Responsable d'Option",
      },
      {
        name: 'teacher',
        display_name: 'Enseignant',
      },
    ])
  }
}
