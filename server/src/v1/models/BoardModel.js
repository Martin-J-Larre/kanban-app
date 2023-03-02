const mongoose = require("mongoose");
const { schemaOptions } = require("./optionsModel");

const BoardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: true,
    },
    icon: {
      type: String,
      default: "📜",
    },
    title: {
      type: String,
      default: "Untitled",
    },
    description: {
      type: String,
      default: "Add description here ...",
    },
    position: Number,
    favourite: {
      type: Boolean,
      default: false,
    },
    favouritePosition: {
      type: Number,
      default: 0,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("Board", BoardSchema);
