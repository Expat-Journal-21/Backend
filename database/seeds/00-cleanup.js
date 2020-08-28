const knexcleaner = require("knex-cleaner")

exports.seed = function(knex) {
  // Deletes ALL existing entries

  return knexcleaner.clean(knex, {
    ignoreTables: ['knex_migrations', 'knex_migrations_lock']
  } )
};
