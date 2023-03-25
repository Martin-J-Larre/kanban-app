const TaskModel = require("../models/TaskModel");
const SectionModel = require("../models/SectionModel");

exports.createTask = async (req, res) => {
  const { sectionId } = req.body;

  try {
    const section = await SectionModel.findById(sectionId);
    const tasksCounter = await TaskModel.find({ section: sectionId }).count();
    const task = await TaskModel.create({
      section: sectionId,
      position: tasksCounter > 0 ? tasksCounter : 0,
    });
    task._doc.section = section;
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await TaskModel.findByIdAndUpdate(taskId, { $set: req.body });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const currentTask = await TaskModel.findById(taskId);
    await TaskModel.deleteOne({ _id: taskId });
    const tasks = await TaskModel.find({ section: currentTask.section }).sort(
      "position"
    );
    for (const key in tasks) {
      await TaskModel.findByIdAndUpdate(tasks[key]._id, {
        $set: { position: key },
      });
    }
    res.status(200).json("Task deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updatePositionTask = async (req, res) => {
  const {
    resourceList,
    destinationList,
    resourceSectionId,
    destinationSectionId,
  } = req.body;

  const resourceListReverse = resourceList.reverse();
  const destinationListReverse = destinationList.reverse();

  try {
    if (resourceSectionId !== destinationSectionId) {
      for (const key in resourceListReverse) {
        await TaskModel.findByIdAndUpdate(resourceListReverse[key].id, {
          $set: { section: resourceSectionId, position: key },
        });
      }
    }
    for (const key in destinationListReverse) {
      await TaskModel.findByIdAndUpdate(destinationListReverse[key].id, {
        $set: { section: destinationSectionId, position: key },
      });
    }
    res.status(200).json("Position Task updated");
  } catch (err) {
    res.status(500).json(err);
  }
};
