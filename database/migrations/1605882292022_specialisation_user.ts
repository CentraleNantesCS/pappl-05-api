import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SpecialisationUser extends BaseSchema {
  protected tableName = 'specialisation_user'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().notNullable()
      table.integer('specialisation_id').unsigned().notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
