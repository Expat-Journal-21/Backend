const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { authToken } = require("../middleware/auth-middleware");

//routers
const authRouter = require("../routes/auth-router");
const postsRouter = require("../routes/posts-router");
const publicRouter = require("../routes/public-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/posts", authToken, postsRouter);
server.use("/api/public", publicRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

module.exports = server;
