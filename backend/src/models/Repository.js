const mongoose = require("mongoose");

const repositorySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // creates a relationship between Repository and User
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },

    slug: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// unique index
repositorySchema.index(
  {
    owner: 1,
    slug: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("Repository", repositorySchema);
