const BoardModel = require("../models/BoardModel");
const SectionModel = require("../models/SectionModel");
const TaskModel = require("../models/TaskModel");

exports.createBoard = async (req, res) => {
  try {
    const boardCounter = await BoardModel.find().count();
    const board = await BoardModel.create({
      user: req.user._id,
      position: boardCounter > 0 ? boardCounter : 0,
    });
    res.status(201).json({
      status: "success",
      message: "Board created successfully",
      board,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Board could not be created",
      err,
    });
  }
};

exports.getAllBoards = async (req, res) => {
  try {
    const boards = await BoardModel.find({ user: req.user._id }).sort(
      "-position"
    );
    res.status(201).json({
      status: "success",
      message: "Boards found successfully",
      boards,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Boards could not be found",
      err,
    });
  }
};
