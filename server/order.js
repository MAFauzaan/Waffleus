const mongoose = require("mongoose");

const order = new mongoose.Schema({
  user: Object,
  items: Array,
  totalQuantity: Number,
  grandTotal: String,
  orderDate: String,
  deliveryStatus: String,
  potonganHarga: String,
});

module.exports = mongoose.model("Order", order);