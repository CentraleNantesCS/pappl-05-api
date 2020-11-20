import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Subject from 'App/Models/Subject'

export default class Specialisation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public acronym: string

  @column()
  public title: string

  @manyToMany(() => Subject, {
    localKey: 'id',
    pivotForeignKey: 'specialisation_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'subject_id',
  })
  public subjects: ManyToMany<typeof Subject>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
