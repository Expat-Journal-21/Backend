require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  authToken: function (req, res, next) {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "Token is invalid or expired" });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res
        .status(401)
        .json({ message: "Please login to gain access to this resource" });
    }
  },
};
