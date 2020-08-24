const db = require("../models/posts-model")

module.exports = {
    validatePostId: function(req, res, next) {
        const  id  = req.params.postId

        db.findById(id)
        .then((post) => {
            if(post) {
                next()
            } else {
                res.status(404).json({message: "Could not find a post with that id"})
            }
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
    },

    validatePost: function(req, res, next) {
        const title = req.body.title
        const description = req.body.description
        const user_id = req.body.user_id

        if(!title) {
            res.status(400).json({ error: "Missing post title" });
        } else if (!description) {
            res.status(400).json({ error: "Missing post description" });
        } else if (!user_id) {
            res.status(400).json({ error: "Missing user_id" });
        } else {
            next()
        }
    }, 

}