const Reviews = require('../models/Review');

const controllers = {
    addReview: async (req, res) => {
        try {
            const newReview = new Reviews(req.body)
            await newReview.save()
            return res.json({ msg: 'Added 🍻' })
        } catch (err) {
            return res.json({ msg: err.message })
        }
    },
    updateReview: async (req, res) => {
        try {
            const { _id, content } = req.body;
            const oldReview = await Reviews.findOneAndUpdate(_id, { content });
            return res.status(200).json(oldReview)
        } catch (err) {
            return res.json({ msg: err.message })
        }
    },
    getReviews: async (req, res) => {
        try {
            const { bookId: book_id } = req.params;
            const bookReviews = await Reviews.find({ book_id });
            return res.status(200).json(bookReviews)
        } catch (err) {
            return res.json({ msg: err.message })
        }
    },
    deleteReview: async (req, res) => {
        try {
            const { _id } = req.body;
            const deletedReview = await Reviews.findOneAndDelete({ _id });
            return res.status(200).json(deletedReview)
        } catch (err) {
            return res.json({ msg: err.message })
        }
    },
    upvoteReview: async (req, res) => {
        try {
            const { _id, upvotes } = req.body;
            const oldReview = await Reviews.findOneAndUpdate(_id, {upvotes});
            return res.status(200).json(oldReview)
        } catch (err) {
            return res.json({ msg: err.message })
        }
    },
}
module.exports = controllers;