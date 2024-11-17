const jwt = require("jsonwebtoken");
require('dotenv').config()

function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
}

module.exports = generateToken;
