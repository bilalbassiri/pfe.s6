const Books = require("../models/Book");
const controllers = {
  getBooks: async (req, res) => {
    try {
      const books = await Books.find({ quantity: { $gt: 0 } })
        .sort("-createdAt")
        .limit(50);
      const popular = await Books.find({ quantity: { $gt: 0 } })
        .sort("-rating_count")
        .limit(10);
      res.status(200).json({ all: books, popular });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getBookDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Books.findOne({ _id: id });
      res.status(200).json(book);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addBook: async (req, res) => {
    try {
      const { name } = req.body;
      const book = await Books.findOne({ name });
      if (book) return res.status(400).json({ msg: "This book already exist" });
      const newBook = new Books(req.body);
      await newBook.save();
      return res.json({ msg: "Added 🍻" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteBook: async (req, res) => {
    try {
      const { ids } = req.body;
      const deleteState = await Books.deleteMany({
        _id: {
          $in: ids,
        },
      });
      return res.json(deleteState);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateBook: async (req, res) => {
    try {
      const { _id, update } = req.body;
      const originalBook = await Books.findByIdAndUpdate(_id, update);
      return res.json(originalBook);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateRating: async (req, res) => {
    try {
      const { _id, rating } = req.body;
      const originalBook = await Books.findByIdAndUpdate(_id, { rating });
      return res.json(originalBook);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getBooksCategory: async (req, res) => {
    try {
      const books = await Books.find();
      return res.json({ books });
    } catch (error) {
      console.log(error.message);
    }
  },
};
module.exports = controllers;
