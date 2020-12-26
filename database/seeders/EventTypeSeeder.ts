import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import EventType from 'App/Models/EventType'

export default class EventTypeSeeder extends BaseSeeder {
  public async run() {
    await EventType.createMany([
      {
        name: 'Cours Magistral',
        acronym: 'CM',
      },
      {
        name: 'Travaux Pratiques',
        acronym: 'TP',
      },
      {
        name: 'Travaux Dirigés',
        acronym: 'TD',
      },
      {
        name: 'Soutenances',
        acronym: 'ST',
      },
      {
        name: 'Journée Banalisée',
        acronym: 'JB',
      },
      {
        name: 'Demi-Journée Banalisée',
        acronym: 'DJB',
      },
    ])
  }
}
