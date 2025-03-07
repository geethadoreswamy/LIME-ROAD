const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
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
        default: 'vendor',
    },
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
