const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    picture: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true,
    },
    card: {
        type: Array,
        default: []
    },
    wishlist: {
        type: Array,
        default: []
    },
    notifications: {
        type: Array,
        default: []
    },
    currently_reading: {
        type: Array
    },
    read: {
        type: Array
    },
    to_read: {
        type: Array
    },
    role: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    })
module.exports = model('users', userSchema);