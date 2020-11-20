import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EventTypes extends BaseSchema {
  protected tableName = 'event_types'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('acronym')
      table.string('name')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
