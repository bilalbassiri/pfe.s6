const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    user: {
        type: Object,
        required: true
    },
    books: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = new model('orders', orderSchema);