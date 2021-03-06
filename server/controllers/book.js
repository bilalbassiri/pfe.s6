const Books = require("../models/Book");

const controllers = {
  getBooks: async (req, res) => {
    try {
      const books = await Books.find({ quantity: { $gt: 0 } })
        .sort("-createdAt")
        .select("-description -language -pages -sales")
        .limit(30);
      const popular = await Books.find({ quantity: { $gt: 0 } })
        .sort("-rating_count")
        .select("-description -language -pages -sales")
        .limit(15);
      const most_rated = await Books.find({ quantity: { $gt: 0 } })
        .sort("-rating")
        .select("-description -language -pages -sales")
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
      const books = await Books.find({ genres: { $in: name } }).limit(25);
      return res.status(200).json({ books });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getSearchBooks: async (req, res) => {
    try {
      const { name, genre, range } = req.body;
      const filter = {
        price: { $gte: range[0], $lte: range[1] },
      };
      if (name) {
        filter.name = { $regex: name, $options: "i" };
      }
      if (genre) {
        filter.genres = { $in: genre };
      }
      const result = await Books.find(filter).limit(30);
      return res.status(200).json(result);
    } catch (err) {
      return res.json({ msg: err.message });
    }
  },
};
module.exports = controllers;
