require("dotenv").config();
const router = require("express").Router();
const db = require("../models/posts-model");

router.get("/", (req, res) => {
    db.findByIfPublic()
    .then(posts => {
        let sortedPosts = posts.map((post) => {
            let array = post.images.split(",");
            return { ...post, images: array };
        })

        res.status(200).json(sortedPosts)
    })
    .catch((err) => {
        res
          .status(500)
          .json({ error: `There was a problem retrieving the posts ${err}` });
      });
})

module.exports = router