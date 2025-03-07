const express = require('express');
const Vendor = require('../models/vendor');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const router = express.Router();

router.post('/register', async (req, res) => {
    const vendor = req.body; // Expecting a single vendor object
    console.log('Received vendor data:', vendor); // Log the received vendor data for debugging

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(vendor.password, 10);
        vendor.password = hashedPassword; // Replace the plain password with the hashed password
        const savedVendor = await Vendor.create(vendor); // Save a single vendor

        console.log('Vendor saved successfully:', savedVendor); // Log success for debugging

        res.status(201).json({ message: `Vendor registered successfully` });

    } catch (error) {
        console.error('Failed to create vendor:', error.message); // Log the error message
        res.status(400).json({ error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Expecting email and password
    try {
        const vendor = await Vendor.findOne({ email }); // Find vendor by email

        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful', vendor });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; // Export the router
