const mongoose = require("mongoose");

const base = new mongoose.Schema({
  _id: String,
  baseName: String,
  price:  Number,
  img: String,
  jumlahTerjual: Number
});

module.exports = mongoose.model("Base", base);