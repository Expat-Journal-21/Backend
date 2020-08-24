require("dotenv").config();
const router = require("express").Router();
const db = require("../models/posts-model");
const {validateUserId} = require("../middleware/users-middleware")
const { validatePostId, validatePost} = require("../middleware/posts-middleware")

router.get("/", (req, res) => {
  db.find()
    .then((posts) => {
      let sortedPosts = posts.map((post) => {
        let array = post.images.split(",");
        return { ...post, images: array };
      });

      res.status(200).json(sortedPosts);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: `There was a problem retrieving the posts ${err}` });
    });
});


router.get("/:postId", validatePostId, (req, res) => {
  const postId = req.params.postId;

  db.findById(postId)
    .then((post) => {
      let array = post.images.split(",");
      res.status(200).json({ ...post, images: array });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: `There was a problem retrieving the post ${err}` });
    });
});


router.get("/user/:id", validateUserId, (req, res) => {
  const userId = req.params.id;

  db.findByUserId(userId)
    .then((userPosts) => {
      let sortedPosts = userPosts.map((post) => {
        let array = post.images.split(",");
        return { ...post, images: array };
      });

      res.status(200).json(sortedPosts);
    })
    .catch((err) => {
      res.status(500).json({
        error: `There was a problem retrieving the user's posts ${err}`,
      });
    });
});


router.post("/", validatePost, (req, res) => {
  const post = req.body;

  db.insert(post)
    .then((newPost) => {
      let array = newPost.images.split(",");
      res.status(201).json({
        newPost: {
          id: newPost.id,
          title: newPost.title,
          description: newPost.description,
          is_public: newPost.is_public,
          user_id: newPost.user_id,
          images: array,
        },
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: `There was a problem adding the new post ${err}` });
    });
});

router.put("/:postId",validatePostId, (req, res) => {
  const postId = req.params.postId;
  const changes = req.body;

  db.update(changes, postId)
    .then((updatedPost) => {
      let array = updatedPost.images.split(",");
      res.status(200).json({
        updatedPost: {
          ...updatedPost,
          images: array,
        },
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: `There was a problem updating that post ${err}` });
    });
});

router.delete("/:postId",validatePostId, (req, res) => {
  const postId = req.params.postId;
  db.remove(postId)
    .then((count) => {
      res.status(200).json(count);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: `There was a problem deleting that post ${err}` });
    });
});

module.exports = router;
