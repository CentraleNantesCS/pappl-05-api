import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Periods extends BaseSchema {
  protected tableName = 'periods'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('start')
      table.date('end')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
