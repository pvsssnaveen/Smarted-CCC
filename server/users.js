const bcrypt = require("bcrypt");

// Hashed password: password123
const users = [
  {
    email: "test@example.com",
    username: "testuser",
    password: bcrypt.hashSync("password123", 10)
  }
];

function findByEmail(email) {
  return users.find(user => user.email === email);
}

function findByUsername(username) {
  return users.find(user => user.username === username);
}

module.exports = { users, findByEmail, findByUsername };
