const knex = require("knex")

const knexConfig = require("../knexfile")
const environment = process.env.DB_ENV || "customenv"

module.exports = knex(knexConfig[environment])