require("dotenv").config();
const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const db = require("../models/auth-model");
const {
  validateUserId,
  validateUser,
  validateUserLogin,
} = require("../middleware/users-middleware");
const { signToken } = require("../helpers/auth-helpers");

router.post("/register", validateUser, (req, res) => {
  const creds = req.body;
  const rounds = process.env.BCRYPT_ROUNDS || 10;
  const hash = bcryptjs.hashSync(creds.password, rounds);
  creds.password = hash;

  db.insert(creds)
    .then((user) => {
      res.status(201).json({ user: user });
    })
    .catch((err) => {
      if (err.message.includes("UNIQUE constraint failed")) {
        res.status(500).json({ error: `Username or Email already registered` });
      } else {
        res
          .status(500)
          .json({ error: `Error registering new user ${err.message}` });
      }
    });
});

router.post("/login", validateUserLogin, (req, res) => {
  const { email, username, password } = req.body;
  let usernameOrPassword;

  if ("username" in req.body) {
    usernameOrPassword = { username: username };
  } else if ("email" in req.body) {
    usernameOrPassword = { email: email };
  }

  db.findBy(usernameOrPassword)
    .then(([user]) => {
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200).json({ user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
        token:token 
    });
      } else {
        res.status(401).json({ message: "Invalid credentials " });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
