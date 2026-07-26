const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    repository: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Repository",
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Issue", issueSchema);
