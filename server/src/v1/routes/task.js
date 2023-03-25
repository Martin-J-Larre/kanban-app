const router = require("express").Router({ mergeParams: true });
const { param, body } = require("express-validator");
const tokenHandler = require("../utils/tokenHandler");
const validation = require("../utils/validation");
const taskController = require("../controllers/taskController");

router.post(
  "/",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("Invalid board Id");
    } else {
      return Promise.resolve();
    }
  }),
  body("sectionId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("Invalid section Id");
    } else {
      return Promise.resolve();
    }
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.createTask
);

router.put(
  "/update-position",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("Invalid board Id");
    } else {
      return Promise.resolve();
    }
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.updatePositionTask
);

router.delete(
  "/:taskId",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("Invalid board Id");
    } else {
      return Promise.resolve();
    }
  }),
  param("taskId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("Invalid task Id");
    } else {
      return Promise.resolve();
    }
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.deleteTask
);

router.put(
  "/:taskId",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("Invalid board Id");
    } else {
      return Promise.resolve();
    }
  }),
  param("taskId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("Invalid task Id");
    } else {
      return Promise.resolve();
    }
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.updateTask
);

module.exports = router;
