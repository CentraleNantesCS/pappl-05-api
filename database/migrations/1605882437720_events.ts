import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Events extends BaseSchema {
  protected tableName = 'events'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('start')
      table.timestamp('end')
      table.integer('event_type_id').unsigned().notNullable()
      table.boolean('remote')
      table.integer('subject_id').unsigned().notNullable()
      table.integer('calendar_id').unsigned().notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
