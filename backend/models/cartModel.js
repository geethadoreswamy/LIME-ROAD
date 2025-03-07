const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  productId: String,
  size: String,
  quantity: Number,
  userId: String
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart