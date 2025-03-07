const mongoose = require('mongoose');
const Product = require('./models/productModel');
const productsData = require('./products.json');

const uri = 'mongodb://127.0.0.1:27017/lime_road'; // Update with your MongoDB connection string


const seedProducts = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        await Product.deleteMany({}); // Clear existing products
        console.log('Existing products cleared');

        const products = productsData.products.WOMEN.concat(productsData.products.MEN);
        await Product.insertMany(products);
        console.log('Products inserted successfully');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding products:', error.message);
    }
};

seedProducts();
