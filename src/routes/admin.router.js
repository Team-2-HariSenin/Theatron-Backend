const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/auth.js");
const {
  addMovie,
  addTrailer,
} = require("../controllers/admin.controller.js.js");

router.post("/add-movie", addMovie);
router.post("/add-trailer", addTrailer);

module.exports = router;
