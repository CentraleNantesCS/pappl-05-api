import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SpecialisationSubject extends BaseSchema {
  protected tableName = 'specialisation_subject'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('specialisation_id').unsigned().notNullable()
      table.integer('subject_id').unsigned().notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
