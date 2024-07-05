const express = require("express");

const router = express.Router();

const { verifyTokenAdmin } = require("../middlewares/auth.js");
const {
  addMovie,
  addTrailer,
  addDirector,
  addWriter,
  addStar,
  addCategory,
  getAllUser,
  getAllAdmin,
  getAllWriter,
  getAllStar,
  getAllDirector,
} = require("../controllers/admin.controller.js.js");
const addImage = require("../controllers/image.controller.js");
const uploadImage = require("../middlewares/multer.js");
const { validateRegisterAdmin } = require("../middlewares/validator.js");
const { addAdmin } = require("../controllers/auth.controller.js");

router.post("/add-movie", verifyTokenAdmin, addMovie);
router.post("/add-trailer", verifyTokenAdmin, addTrailer);
router.post("/add-director", verifyTokenAdmin, addDirector);
router.post("/add-writer", verifyTokenAdmin, addWriter);
router.post("/add-star", verifyTokenAdmin, addStar);
router.post("/add-category", verifyTokenAdmin, addCategory);
router.post("/add-admin", verifyTokenAdmin, validateRegisterAdmin, addAdmin);
router.post("/add-image", verifyTokenAdmin, uploadImage, addImage);
router.get("/all-user", verifyTokenAdmin, getAllUser);
router.get("/all-admin", verifyTokenAdmin, getAllAdmin);
router.get("/all-writer", verifyTokenAdmin, getAllWriter);
router.get("/all-star", verifyTokenAdmin, getAllStar);
router.get("/all-director", verifyTokenAdmin, getAllDirector);

module.exports = router;
