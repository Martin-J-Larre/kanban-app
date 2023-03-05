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
    res.status(201).json(board);
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
    res.status(201).json(boards);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Boards could not be found",
      err,
    });
  }
};

exports.updatePosition = async (req, res) => {
  const { boards } = req.body;
  console.log("boards req.body:", boards);

  try {
    for (const key in boards.reverse()) {
      const board = boards[key];
      console.log(" ~ board:", board);
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Boards could not be updated",
      err,
    });
  }
};
