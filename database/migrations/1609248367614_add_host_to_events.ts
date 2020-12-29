import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddHostToEvents extends BaseSchema {
  protected tableName = 'events'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('user_id').unsigned().nullable()
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('user_id')
    })
  }
}
