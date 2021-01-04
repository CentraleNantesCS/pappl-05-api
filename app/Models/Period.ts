import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
/**
 * Periodes
 * NOT IMPLEMENTED
 * e.g: (P1 = MADIS, OBJET, BDONN, GELOL, P2= ...etc)
 */
export default class Period extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public start: Date

  @column()
  public end: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
