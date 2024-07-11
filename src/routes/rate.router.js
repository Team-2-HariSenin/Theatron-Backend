const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/auth");
const {
  index,
  addRate,
  deleteRate,
} = require("../controllers/rate.controller");

router.get("/", verifyToken, index);
router.post("/", verifyToken, addRate);
router.delete("/", verifyToken, deleteRate);

module.exports = router;
