const mongoose = require("mongoose");

const commitSchema = new mongoose.Schema(
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

    commitId: {
      type: String,
      required: true,
      unique: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    parentCommit: {
      type: String,
      default: null,
    },

    isPushed: {
      type: Boolean,
      default: false,
    },

    zipPath: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Commit", commitSchema);
