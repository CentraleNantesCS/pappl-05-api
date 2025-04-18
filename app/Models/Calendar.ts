import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Class from 'App/Models/Class'
import Specialisation from 'App/Models/Specialisation'
import Event from './Event'

export default class Calendar extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  /**
   * Promotion
   */
  @column()
  public classe_id: number

  @belongsTo(() => Class, {
    foreignKey: 'classe_id',
  })
  public classe: BelongsTo<typeof Class>

  /**
   * Option
   */
  @column()
  public specialisation_id: number

  @belongsTo(() => Specialisation, {
    foreignKey: 'specialisation_id',
  })
  public specialisation: BelongsTo<typeof Specialisation>

  /**
   * Evenements du calendrier
   */
  @hasMany(() => Event, {
    foreignKey: 'calendar_id',
  })
  public events: HasMany<typeof Event>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
