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
    highlights: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    genres: {
        type: Array,
        default: ['Romance', 'Philosophy', 'Science Fiction', 'Literature', 'Fantasy']
    },
    cart: [
        {
            type: Schema.Types.ObjectId,
            ref: 'books'
        }
    ],
    favoris: [
        {
            type: Schema.Types.ObjectId,
            ref: 'books'
        }
    ],
    notifications: {
        type: Array,
        default: []
    },
    currently_reading: [
        {
            type: Schema.Types.ObjectId,
            ref: 'books'
        }
    ],
    read: [
        {
            type: Schema.Types.ObjectId,
            ref: 'books'
        }
    ],
    to_read: [
        {
            type: Schema.Types.ObjectId,
            ref: 'books'
        }
    ],
    bio: {
        type: String,
        default: 'Consequat deserunt velit consectetur adipisicing aute nisi ea dolore ipsum mollit culpa. Ut laborum pariatur Lorem id ad nisi deserunt proident amet. Id excepteur occaecat esse nostrud. Ad incididunt eiusmod reprehenderit mollit elit cillum in aute commodo sunt magna ad officia. Pariatur deserunt et incididunt duis ut laborum dolore do velit enim anim amet sint consectetur. Dolore consequat cupidatat consectetur culpa.'
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