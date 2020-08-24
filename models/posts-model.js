const db = require("../database/db-config")

module.exports = {
find,
findById,
findByUserId,
findByIfPublic,
insert,
update,
remove
}

function find() {
    return db("posts")
}

function findById(id) {
    return db("posts").where({id}).first()
}

function findByUserId(user_id) {
    return db("posts").where({user_id}).orderBy("id")
}

function findByIfPublic() {
    return db("posts").where("is_public", 1).orderBy("id")
}

function insert(post) {
    return db("posts")
    
    .insert(post)
    .then(ids => {
        const id = ids[0]
        console.log(id)
        return findById(id)
    })
}

function update(changes, id) {
    return db("posts")
    .where({id})
    .update(changes)
    .then(() => {
        return findById(id)
    })
}

function remove(id) {
    return db("posts").where("id", id).del()
}