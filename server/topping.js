const mongoose = require("mongoose");

const topping = new mongoose.Schema({
  _id: String,
  toppingName: String,
  price: Number,
  img: String,
  jumlahTerjual: String
});

module.exports = mongoose.model("Topping", topping);