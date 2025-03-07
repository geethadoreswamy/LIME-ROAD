const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,



    },
    password: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'customer',
    },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
