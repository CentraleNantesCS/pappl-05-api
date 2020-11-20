import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RoleUser extends BaseSchema {
  protected tableName = 'role_user'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().notNullable()
      table.integer('role_id').unsigned().notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
