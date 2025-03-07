const express = require('express');
const Product = require('../models/productModel');
const router = express.Router();
router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findOne({ id: productId });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// router.post('/cart', async (req, res) => {
//     console.log('Received cart item:', req.body); // Log the incoming request
//     console.log('Product ID:', productId, 'Size:', size, 'Quantity:', quantity, 'User ID:', userId); // Log the individual fields
//     const { productId, size, quantity, userId } = req.body; // Include userId if needed
//     try {
//         const newCartItem = new CartItem({ productId, size, quantity, userId });
//         const savedCartItem = await newCartItem.save();
//         console.log('Cart item saved:', savedCartItem); // Log the saved cart item
//         res.status(201).json({ message: 'Cart item saved successfully' });
//     } catch (error) {
//         console.error('Error saving cart item:', error.message);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
module.exports = router;
