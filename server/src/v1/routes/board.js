const router = require("express").Router();
const { param } = require("express-validator");
const validation = require("../utils/validation");
const tokenHandler = require("../utils/tokenHandler");
const boardController = require("../controllers/boardController");

router.post("/", tokenHandler.verifyToken, boardController.createBoard);
router.get("/", tokenHandler.verifyToken, boardController.getAllBoards);
router.get(
  "/favourites",
  tokenHandler.verifyToken,
  boardController.getFavourites
);
router.put(
  "/favourites",
  tokenHandler.verifyToken,
  boardController.updateFavouritePosition
);
router.get(
  "/:boardId",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid id");
    } else {
      return Promise.resolve();
    }
  }),
  validation.validate,
  tokenHandler.verifyToken,
  boardController.getOneBoard
);
router.put(
  "/:boardId",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid id");
    } else {
      return Promise.resolve();
    }
  }),
  validation.validate,
  tokenHandler.verifyToken,
  boardController.updateBoard
);
router.put("/", tokenHandler.verifyToken, boardController.updatePositionBoard);
// delete
router.delete(
  "/:boardId",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid id");
    } else {
      return Promise.resolve();
    }
  }),
  validation.validate,
  tokenHandler.verifyToken,
  boardController.deleteBoard
);

module.exports = router;
