import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MakeSubjectNullables extends BaseSchema {
  protected tableName = 'events'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('subject_id').unsigned().nullable()
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('subject_id')
    })
  }
}
