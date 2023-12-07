import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('password').notNullable()
      table.string('email').notNullable().unique()
      table.string('firstName').nullable()
      table.string('lastName').nullable()
      table.string('role').notNullable().defaultTo('user')
      table.string('remember_me_token').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, () => {})
  }
}