const router = require("express").Router({ mergeParams: true });
const { param } = require("express-validator");
const tokenHandler = require("../utils/tokenHandler");
const validation = require("../utils/validation");
const sectionController = require("../controllers/sectionController");

router.post(
  "/",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("Invalid Id");
    } else {
      return Promise.resolve();
    }
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.createSection
);

router.put(
  "/:sectionId",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("Invalid board Id");
    } else {
      return Promise.resolve();
    }
  }),
  param("sectionId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("Invalid section Id");
    } else {
      return Promise.resolve();
    }
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.updateSection
);

router.delete(
  "/:sectionId",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("Invalid board Id");
    } else {
      return Promise.resolve();
    }
  }),
  param("sectionId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("Invalid section Id");
    } else {
      return Promise.resolve();
    }
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.deleteSection
);

module.exports = router;
