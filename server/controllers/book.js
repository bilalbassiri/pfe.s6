const Books = require('../models/Book');
const controllers = {
    getBooks: async (req, res) => {
        try {
            const books = await Books.find().sort('-createdAt')
            res.status(200).json(books)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getBookDetail: async (req, res) => {
        try {
            const { id } = req.params;
            const book = await Books.findOne({ _id: id })
            res.status(200).json(book)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addBook: async (req, res) => {
        try {
            const { name } = req.body;
            const book = await Books.findOne({ name })
            if (book) return res.status(400).json({ msg: 'This book already exist' })
            const newBook = new Books(req.body)
            await newBook.save()
            return res.json({ msg: 'Added 🍻' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteBook: async (req, res) => {
        try {
            const { _id } = req.body;
            const deletedCategory = await Books.findByIdAndDelete({ _id })
            return res.json(deletedCategory)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateBook: async (req, res) => {
        try {
            const { _id, update } = req.body;
            const originalBook = await Books
                .findByIdAndUpdate(_id, update)
            return res.json(originalBook)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateRating: async (req, res) => {
        try {
            const { _id, rating } = req.body;
            const originalBook = await Books
                .findByIdAndUpdate(_id, { rating })
            return res.json(originalBook)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}
module.exports = controllers;