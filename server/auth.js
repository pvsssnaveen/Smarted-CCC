const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

module.exports = { generateToken };
