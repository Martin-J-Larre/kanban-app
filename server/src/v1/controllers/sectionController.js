const SectionModel = require("../models/SectionModel");
const TaskModel = require("../models/TaskModel");

exports.createSection = async (req, res) => {
  const { boardId } = req.params;
  try {
    const section = await SectionModel.create({ board: boardId });
    section._doc.task = [];
    res.status(201).json(section);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Section could not be created",
      err,
    });
  }
};

exports.updateSection = async (req, res) => {
  const { sectionId } = req.params;
  try {
    const section = await SectionModel.findByIdAndUpdate(sectionId, {
      $set: req.body,
    });
    section._doc.task = [];
    res.status(200).json(section);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Section could not be updated",
      err,
    });
  }
};

exports.deleteSection = async (req, res) => {
  const { sectionId } = req.params;
  try {
    await TaskModel.deleteMany({ section: sectionId });
    await SectionModel.deleteOne({ _id: sectionId });
    res.status(200).json({
      status: "success",
      message: "Section deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Section could not be updated",
      err,
    });
  }
};
