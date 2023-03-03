const mongoose = require("mongoose");
const { schemaOptions } = require("./optionsModel");

const SectionSchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.ObjectId,
      ref: "Board",
      require: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  schemaOptions
);

module.exports = mongoose.model("Section", SectionSchema);
