const express = require("express");

const router = express.Router();

const { verifyTokenAdmin } = require("../middlewares/auth.js");
const {
  addMovie,
  addTrailer,
} = require("../controllers/admin.controller.js.js");
const addImage = require("../controllers/image.controller.js");
const uploadImage = require("../middlewares/multer.js");

router.post("/add-movie", verifyTokenAdmin, addMovie);
router.post("/add-trailer", verifyTokenAdmin, addTrailer);
router.post("/add-image", verifyTokenAdmin, uploadImage, addImage);

module.exports = router;
