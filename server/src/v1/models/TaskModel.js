const mongoose = require("mongoose");
const { schemaOptions } = require("./optionsModel");

const TaskSchema = new mongoose.Schema(
  {
    section: {
      type: mongoose.Schema.ObjectId,
      ref: "Section",
      require: true,
    },
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    position: Number,
  },
  schemaOptions
);

module.exports = mongoose.model("Task", TaskSchema);
