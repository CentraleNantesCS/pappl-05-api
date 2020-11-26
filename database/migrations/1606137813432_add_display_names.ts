import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Roles extends BaseSchema {
  protected tableName = 'roles'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('display_name')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('display_name')
    })
  }
}
