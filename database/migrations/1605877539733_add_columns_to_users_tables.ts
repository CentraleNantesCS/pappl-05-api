import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('firstname')
      table.string('lastname')
      table.string('acronym')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('firstname')
      table.dropColumn('lastname')
      table.dropColumn('acronym')
    })
  }
}
