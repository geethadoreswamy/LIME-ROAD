const express = require('express');
const Cart = require('../models/cartModel');
const router = express.Router();

router.post('/', async (req, res) => {
  console.log('Received cart item:', req.body); // Log the received cart item
  const cartItem = new Cart(req.body);

  try {
    await cartItem.save();
    res.status(201).send(cartItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.status(200).send(cartItems);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
