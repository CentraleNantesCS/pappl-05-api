import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Classes extends BaseSchema {
  protected tableName = 'classes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('start_year')
      table.integer('end_year')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
