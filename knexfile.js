// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./database/expatjournal.db3",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
  testing: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./database/expatjournal-test.db3",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./database/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },

  custom: {
    client: 'pg',
    connection: {
      host: "localhost",
      port: 5432,
      database: "postgres",
      user: "postgres",
      password: "LuLu123!",
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
    },
    seeds: { directory: './database/seeds' },
  },
};
