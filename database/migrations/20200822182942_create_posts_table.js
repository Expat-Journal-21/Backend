
exports.up = function(knex) {
  return knex.schema.createTable("posts", tbl => {
      tbl.increments()
      tbl.string("title", 255).notNullable()
      tbl.string("description").notNullable()
      tbl.date("date").notNullable().defaultTo(new Date().toLocaleString())
      tbl.specificType("images", 'text ARRAY')
      tbl.boolean("is_public").notNullable().defaultTo(false)

      tbl.integer("user_id")
      
      .notNullable()
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("posts")
};
