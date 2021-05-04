const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    release: {
        type: Date,
        default: Date.now,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 0
    },
    rating_count: {
        type: Number,
        default: 0
    },
    have_read: {
        type: Number,
        default: 0
    },
    currently_reading: {
        type: Number,
        default: 0
    },
    to_read: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0,
        required: true
    },
    categories: {
        type: Array,
    },
},
    {
        timestamps: true
    })

module.exports = model('books', bookSchema);