const mongoose = require("mongoose");

const promo = new mongoose.Schema({
  promoName: String,
  potongan: String
});

module.exports = mongoose.model("Promo", promo);