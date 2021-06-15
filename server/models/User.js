const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    picture: {
      type: String,
      default: "",
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "orders",
      },
    ],
    password: {
      type: String,
      required: true,
    },
    highlights: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    genres: {
      type: Array,
      default: [],
    },
    payed: {
      type: Number,
      default: 0,
    },
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "books",
      },
    ],
    favoris: [
      {
        type: Schema.Types.ObjectId,
        ref: "books",
      },
    ],
    notifications: {
      type: Array,
      default: [],
    },
    new_notifications: {
      type: Array,
      default: [],
    },
    currently_reading: [
      {
        type: Schema.Types.ObjectId,
        ref: "books",
      },
    ],
    read: [
      {
        type: Schema.Types.ObjectId,
        ref: "books",
      },
    ],
    to_read: [
      {
        type: Schema.Types.ObjectId,
        ref: "books",
      },
    ],
    bio: {
      type: String,
      default: "Empty bio..",
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("users", userSchema);
