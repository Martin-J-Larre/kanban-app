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

exports.updatePositionBoard = async (req, res) => {
  const { boards } = req.body;

  try {
    for (const key in boards.reverse()) {
      const board = boards[key];
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Boards could not be updated",
      err,
    });
  }
};

exports.getOneBoard = async (req, res) => {
  const { boardId } = req.params;
  try {
    const board = await BoardModel.findOne({
      user: req.user._id,
      _id: boardId,
    });
    if (!board) {
      return res.status(404).json({
        status: "error",
        message: "Board could not be found",
        err,
      });
    }
    const sections = await SectionModel.find({ board: boardId });
    for (const section of sections) {
      const task = await TaskModel.find({ section: section._id })
        .populate("section")
        .sort("-position");
      section._doc.task = task;
    }
    board._doc.sections = sections;
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Board could not be found",
      err,
    });
  }
};
