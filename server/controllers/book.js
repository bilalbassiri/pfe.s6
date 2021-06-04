const Books = require("../models/Book");
const controllers = {
  getBooks: async (req, res) => {
    try {
      const books = await Books.find({ quantity: { $gt: 0 } })
        .sort("-createdAt")
        .limit(30);
      const popular = await Books.find({ quantity: { $gt: 0 } })
        .sort("-rating_count")
        .limit(15);
      const most_rated = await Books.find({ quantity: { $gt: 0 } })
        .sort("-rating")
        .limit(15);
      res.status(200).json({ all: books, popular, most_rated });
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
      if (book)
        return res.json({ msg: "This book already exist", added: false });
      const newBook = new Books(req.body);
      const result = await newBook.save();
      return res.json({
        msg: newBook.name + " has been added successfully",
        added: true,
        result,
      });
    } catch (err) {
      return res.json({ msg: err.message, added: false });
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
      const updatedBook = await Books.findByIdAndUpdate(_id, update, {
        new: true,
      });
      return res.status(200).json(updatedBook);
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
      const { name } = req.params;
      console.log(name);
      const books = await Books.find({ genres: { $in: name } }).limit(25);
      return res.json({ books });
    } catch (error) {
      console.log(error.message);
    }
  },
};
module.exports = controllers;
