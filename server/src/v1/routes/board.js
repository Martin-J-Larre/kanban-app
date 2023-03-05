const router = require("express").Router();
const { body } = require("express-validator");
const validation = require("../utils/validation");
const tokenHandler = require("../utils/tokenHandler");
const boardController = require("../controllers/boardController");

router.post("/", tokenHandler.verifyToken, boardController.createBoard);
router.get("/", tokenHandler.verifyToken, boardController.getAllBoards);
router.put("/", tokenHandler.verifyToken, boardController.updatePosition);

module.exports = router;
