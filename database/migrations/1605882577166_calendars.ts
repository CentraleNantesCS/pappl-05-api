import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Calendars extends BaseSchema {
  protected tableName = 'calendars'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('classe_id').unsigned().notNullable()
      table.integer('specialisation_id').unsigned().notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
