import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
// Class = Promo
// NOTE: I know it's not the best class name, but blame the translation, in english they say: Class of 2020
export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  /**
   * Année de départ (e.g 2020)
   */
  @column()
  public start_year: number

  /**
   * Année de fin (e.g 2021)
   */
  @column()
  public end_year: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
