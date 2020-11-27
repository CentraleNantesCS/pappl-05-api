import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
// Class = Promo
export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public start_year: number

  @column()
  public end_year: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
