const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth");
const { validateUpdateUser } = require("../middlewares/validator");
const {
  getUserById,
  updateUser,
} = require("../controllers/user.controller.js");

router.get("/", verifyToken, getUserById);
router.put("/", verifyToken, validateUpdateUser, updateUser);

module.exports = router;
