
exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments("id")  
    tbl.string("username", 255).notNullable().unique()
    tbl.string("password", 255).notNullable()
    tbl.string("name", 255).notNullable()
    tbl.string('email', 255).notNullable().unique()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users")
};
