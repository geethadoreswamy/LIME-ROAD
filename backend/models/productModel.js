const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: String, required: true },
    product_name: { type: String, required: true },
    description: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true },
    quantity: { type: Number, required: true },
    sizes: { type: [String], required: true },
    offer_percent: { type: Number, required: true },
    image: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
