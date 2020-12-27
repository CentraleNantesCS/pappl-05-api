import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import EventType from './EventType'
import Subject from './Subject'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public start: DateTime

  @column()
  public end: DateTime

  @column()
  public calendar_id: number

  @column()
  public subject_id: number

  @column()
  public event_type_id: number

  // event_type_id
  @belongsTo(() => EventType, {
    foreignKey: 'event_type_id',
  })
  public eventType: BelongsTo<typeof EventType>

  @column()
  public remote: Boolean

  // subject_id
  @belongsTo(() => Subject, {
    foreignKey: 'subject_id',
  })
  public subject: BelongsTo<typeof Subject>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
