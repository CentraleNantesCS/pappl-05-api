import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PermissionRole extends BaseSchema {
  protected tableName = 'permission_role'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('role_id').unsigned().notNullable()
      table.integer('permission_id').unsigned().notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
