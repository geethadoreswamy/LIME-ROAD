const express = require('express');
const Customer = require('../models/customer');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const router = express.Router();
router.post('/register', async (req, res) => {
    const customer = req.body; // Expecting a single customer object
    console.log('Received customer data:', customer); // Log the received customer data for debugging
    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(customer.password, 10);
        customer.password = hashedPassword; // Replace the plain password with the hashed password
        const savedCustomer = await Customer.create(customer); // Save a single customer
        console.log('Customer saved successfully:', savedCustomer); // Log success for debugging
        res.status(201).json({ message: `Customer registered successfully` });
    } catch (error) {
        console.error('Failed to create customer:', error.message); // Log the error message
        res.status(400).json({ error: error.message });
    }
});
// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Expecting email and password
    try {
        const customer = await Customer.findOne({ email }); // Find customer by email
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        res.status(200).json({ message: 'Login successful', customer });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;

