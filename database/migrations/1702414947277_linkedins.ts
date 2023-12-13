import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Rendre la colonne 'password' nullable
      table.string('password', 180).nullable().alter()

      // Ajout de nouvelles colonnes pour LinkedIn et Ally
      table.string('linkedin_id').nullable()
      table.string('linkedin_token').nullable()
      table.string('ally_id').nullable()
      table.string('ally_token').nullable()
      table.string('avatar').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      // Remettre la colonne 'password' en non-nullable
      table.string('password', 180).notNullable().alter()

      // Suppression des colonnes ajoutées
      table.dropColumn('linkedin_id')
      table.dropColumn('linkedin_token')
      table.dropColumn('ally_id')
      table.dropColumn('ally_token')
      table.dropColumn('avatar')
    })
  }
}
