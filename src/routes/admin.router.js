const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/auth.js");
const { addMovie } = require("../controllers/admin.controller.js.js");

router.post("/add-movie", addMovie);

module.exports = router;
