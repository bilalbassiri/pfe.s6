const { Schema, model } = require('mongoose');
const reviewSchema = new Schema({
    book_id: {
        type: String,
        required: true,
        trim: true
    },
    owner_id: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
},
    {
        timestamps: true
    })
module.exports = model('reviews', reviewSchema)