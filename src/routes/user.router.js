const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth");

const {
  getUserById,
  updateUser,
} = require("../controllers/user.controller.js");

router.get("/", verifyToken, getUserById);
router.put("/", verifyToken, updateUser);

module.exports = router;
