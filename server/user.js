const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  address: String
});

module.exports = mongoose.model("User", user);