require("dotenv").config();
const jwt = require("jsonwebtoken")

module.exports = {
    signToken
}

function signToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        name: user.name,
        email: user.email
    };
    const secret = process.env.JWT_SECRET
    const options = {
        expiresIn: '3h'
    }
    return jwt.sign(payload, secret, options)
}