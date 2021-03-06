const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    release: {
      type: Date,
      default: Date.now,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    rating_count: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
      required: true,
    },
    genres: {
      type: Array,
      default: [],
    },
    inCart: {
      type: Number,
      default: 1,
    },
    language: {
      type: String,
      default: "English",
    },
    pages: {
      type: Number,
      default: 200,
    },
    sales: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("books", bookSchema);
