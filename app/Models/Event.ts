import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import EventType from './EventType'
import Subject from './Subject'
import User from './User'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  /**
   * Date + Heure du début
   */
  @column()
  public start: DateTime

  /**
   * Date + Heure de la fin
   */
  @column()
  public end: DateTime

  /**
   * Calendrier auquel appartient l'evenement
   */
  @column()
  public calendar_id: number

  /**
   * Matière associé (nullable for certain events)
   */
  @column()
  public subject_id: number

  // subject_id
  @belongsTo(() => Subject, {
    foreignKey: 'subject_id',
  })
  public subject: BelongsTo<typeof Subject>

  /**
   * Type d'evenement
   */
  @column()
  public event_type_id: number

  // event_type_id
  @belongsTo(() => EventType, {
    foreignKey: 'event_type_id',
  })
  public eventType: BelongsTo<typeof EventType>

  /**
   * Intervenant (nullable)
   */
  @column()
  public user_id: number

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public host: BelongsTo<typeof User>

  /**
   * Distanciel ?
   */
  @column()
  public remote: Boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
