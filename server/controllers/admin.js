const Users = require("../models/User");
const Reviews = require("../models/Review");
const { Orders, Sales } = require("../models/Order");
const Books = require("../models/Book");
const Mails = require("../models/Mail");

const controllers = {
  getAllData: async (req, res) => {
    try {
      const users = await Users.find().select("-password");
      const reviews = await Reviews.find({ owner: { $ne: null } })
        .populate({
          path: "owner",
          select: "_id name picture email active createdAt",
        })
        .sort("-createdAt");
      const orders = await Orders.find()
        .populate({ path: "user", select: "_id name email picture active" })
        .sort("-createdAt");
      const sales = await Sales.find().sort("-createdAt");
      const books = await Books.find().sort("-createdAt");
      const mails = await Mails.find()
        .populate({
          path: "user",
          select: "_id name email picture active",
        })
        .sort("-createdAt");
      return res.status(200).json({
        users,
        reviews,
        books,
        orders,
        sales,
        mails,
        isLoading: false,
      });
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
  deliverOrder: async (req, res) => {
    try {
      const { order_id, action } = req.body;
      const order = await Orders.findByIdAndUpdate(order_id, action, {
        new: true,
      }).populate({
        path: "user",
        select: "_id name email picture active",
      });
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const { _id } = req.body;
      const order = await Orders.findByIdAndDelete(_id);
      return res.status(200).json({ order_id: order._id });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteAllReviews: async (req, res) => {
    try {
      const result = await Reviews.deleteMany();
      return res.status(200).json(result);
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
  readMessage: async (req, res) => {
    try {
      const { mail_id } = req.body;
      await Mails.findByIdAndUpdate(mail_id, { read: true });
      return res.status(200).json(result);
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
};
module.exports = controllers;
