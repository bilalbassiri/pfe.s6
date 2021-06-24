const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    books: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
    delivering: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("orders", orderSchema);
