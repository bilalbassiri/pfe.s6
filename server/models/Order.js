const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    user: {
      type: Object,
      required: true,
    },
    books: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    exist: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Orders: new model("orders", orderSchema),
  Sales: new model("sales", orderSchema),
};
