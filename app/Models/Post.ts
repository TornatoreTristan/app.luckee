import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public userId: number

  @column()
  public status: string

  @column()
  public slug: string

  @column()
  public image: string

  @column()
  public prompt: string

  @column()
  public idea: string

  @column()
  public tone: string

  @column()
  public model: string

  @column()
  public publishAt: DateTime

  @column()
  public publishedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
