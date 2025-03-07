
const express = require('express');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const router = express.Router();

router.post('/register', async (req, res) => {
    const admin = req.body; // Expecting a single customer object
    console.log('Received customer data:', admin); // Log the received customer data for debugging

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        admin.password = hashedPassword; // Replace the plain password with the hashed password
        const savedAdmin = await Admin.create(admin); // Save a single customer

        console.log('Admin saved successfully:', savedAdmin); // Log success for debugging

        res.status(201).json({ message: `admin registered successfully` });

    } catch (error) {
        console.error('Failed to create admin:', error.message); // Log the error message
        res.status(400).json({ error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Expecting email and password
    try {
        const admin = await Admin.findOne({ email }); // Find customer by email
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful', admin });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;






















