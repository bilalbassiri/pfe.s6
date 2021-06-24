const { Schema, model } = require("mongoose");
const mailSchema = new Schema(
  {
    loggedIn: {
      type: Boolean,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("mails", mailSchema);
