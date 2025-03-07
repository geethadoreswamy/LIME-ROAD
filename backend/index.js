const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRoute = require('./routes/adminRoute');
const customerRoute = require('./routes/customerRoute');
const vendorRoute = require('./routes/vendorRoute');
const path = require('path'); // Import path module
const fs = require('fs'); // Import fs module
const Product = require('./models/productModel'); // Import Product model
const app = express();
const PORT = process.env.PORT || 5027;
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
// Routes
app.use('/api/admin', adminRoute);
app.use('/api/customer', customerRoute);
app.use('/api/vendor', vendorRoute);
app.use('/api/products', require('./routes/productRoute')); // Register product route
app.use('/api/cart', require('./routes/cartRoute')); // Register cart route


app.use('/productsImages', express.static(path.join(__dirname, 'productsImages'))); // Serve static files from productsImages
// MongoDB connection
mongoose.connect('mongodb://127.0.0.1/lime_road', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});
app.get('/products.json', (req, res) => {
    console.log('Request received for products.json'); // Log request for products.json
    res.sendFile(path.join(__dirname, 'products.json')); // Serve products.json
});
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
    // Read products.json and insert data into MongoDB
    try {
        const data = fs.readFileSync(path.join(__dirname, 'products.json'));
        const products = JSON.parse(data).products;
        for (const category in products) {
            for (const product of products[category]) {
                await Product.create(product);
            }
        }
        console.log('Products have been successfully stored in the database.');
    } catch (error) {
        console.error('Error storing products in the database:', error);
    }
});
