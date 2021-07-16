const Reviews = require("../models/Review");
const Books = require("../models/Book");

const controllers = {
  addReview: async (req, res) => {
    try {
      let { book_id, rating, global_rating, rating_count } = req.body;
      global_rating = (global_rating * rating_count + rating) / ++rating_count;
      const newReview = new Reviews(req.body);
      await newReview.save();
      const populatedReview = await Reviews.findOne({
        _id: newReview._id,
      }).populate({ path: "owner", select: "name picture username" });
      const updatedBook = await Books.findByIdAndUpdate(
        book_id,
        { rating: global_rating, rating_count },
        { new: true }
      ).select("rating rating_count");
      return res.json({ populatedReview, updatedBook });
    } catch (err) {
      return res.json({ msg: err.message });
    }
  },
  getReviews: async (req, res) => {
    try {
      const { bookId: book_id } = req.params;
      let bookReviews = await Reviews.find({ book_id })
        .populate({
          path: "owner",
          select: "name username picture",
          match: { active: { $ne: false } },
        })
        .sort("-createdAt");
      bookReviews = bookReviews.filter((rev) => rev.owner !== null);
      return res.status(200).json(bookReviews);
    } catch (err) {
      return res.json({ msg: err.message });
    }
  },
  deleteReview: async (req, res) => {
    try {
      const { _id } = req.body;
      const deletedReview = await Reviews.findOneAndDelete({ _id });
      return res.status(200).json(deletedReview);
    } catch (err) {
      return res.json({ msg: err.message });
    }
  },
  upvoteReview: async (req, res) => {
    try {
      const { _id, currentVotes } = await req.body;
      const review = await Reviews.findOneAndUpdate(
        { _id },
        { upvotes: currentVotes },
        { new: true }
      );
      return res.status(200).json(review);
    } catch (err) {
      return res.json({ msg: err.message });
    }
  },
};
module.exports = controllers;
