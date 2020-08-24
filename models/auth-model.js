const db = require("../database/db-config");

module.exports = {
  find,
  findBy,
  findById,
  insert,
  remove,
};

function find() {
  return db("users");
}

function findById(id) {
  return db("users").where({ id }).first();
}
function findBy(filter) {
  return db("users as u")
    .where(filter)
    .orderBy("id");
}

function insert(user) {
  return db("users as u")
    .insert(user, "id")
    .then((ids) => {
      return findById(ids[0]).select("id","name", "username", "email");
    });
}

function remove(id) {
  return db("users").where("id", id).del();
}
