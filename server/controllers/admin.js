const Users = require("../models/User");
const Reviews = require("../models/Review");
const { Orders, Sales } = require("../models/Order");
const Books = require("../models/Book");

const controllers = {
  getAllUsersReviews: async (req, res) => {
    try {
      const users = await Users.find({ role: { $ne: 1 } }).select("-password");
      const reviews = await Reviews.find()
        .populate({ path: "owner", select: "name picture" })
        .sort("-createdAt");
      const orders = await Orders.find().sort("-createdAt");
      const sales = await Sales.find().sort("-createdAt");
      const books = await Books.find().sort("-createdAt");
      return res.status(200).json({ users, reviews, books, orders, sales });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  setUsersActive: async (req, res) => {
    try {
      const { selectionModel, active } = req.body;
      const updateState = await Users.updateMany(
        { _id: { $in: selectionModel } },
        { active }
      );
      return res.status(200).json(updateState);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = controllers;
