require("dotenv").config();
const router = require("express").Router();
const db = require("../models/posts-model");

router.get("/", (req, res) => {
  db.findByIfPublic()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: `There was a problem retrieving the posts ${err}` });
    });
});

module.exports = router;
