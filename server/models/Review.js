const { Schema, model } = require('mongoose');
const reviewSchema = new Schema({
    book_id: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    content: {
        type: String,
        required: true
    },
    upvotes: {
        type: Array,
        default: []
    },
    rating: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    })
module.exports = model('reviews', reviewSchema)
