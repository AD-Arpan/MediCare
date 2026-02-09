const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        min: 0
    },
    category: {
        type: String,
        required: [true, 'Please enter product category'],
        enum: ['medicines', 'healthcare', 'wellness', 'personal-care']
    },
    manufacturer: {
        type: String,
        required: [true, 'Please enter manufacturer name']
    },
    image: {
        type: String,
        required: [true, 'Please enter product image URL']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema); 