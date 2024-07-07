const express = require("express");

const router = express.Router();

const { verifyTokenAdmin } = require("../middlewares/auth.js");
const {
  getAllAdmin,
  addAdmin,
} = require("../controllers/admin.controller.js.js");
const { addImage, deleteImage } = require("../controllers/image.controller.js");
const uploadImage = require("../middlewares/multer.js");
const { validateRegisterAdmin } = require("../middlewares/validator.js");
const { getAllUser } = require("../controllers/auth.controller.js");
const { addMovie, updateMovie } = require("../controllers/movie.controller.js");
const {
  addTrailer,
  updateTrailer,
} = require("../controllers/trailer.controller.js");
const {
  addDirector,
  getAllDirector,
  updateDirector,
} = require("../controllers/director.controller.js");
const {
  addWriter,
  getAllWriter,
  updateWriter,
} = require("../controllers/writer.controller.js");
const {
  addStar,
  getAllStar,
  updateStar,
} = require("../controllers/star.controller.js");
const {
  addCategory,
  updateCategory,
} = require("../controllers/category.controller.js");

router.post("/add-movie", verifyTokenAdmin, addMovie);
router.post("/add-trailer", verifyTokenAdmin, addTrailer);
router.post("/add-director", verifyTokenAdmin, addDirector);
router.post("/add-writer", verifyTokenAdmin, addWriter);
router.post("/add-star", verifyTokenAdmin, addStar);
router.post("/add-category", verifyTokenAdmin, addCategory);
router.post("/add-admin", verifyTokenAdmin, validateRegisterAdmin, addAdmin);
router.post("/add-image", verifyTokenAdmin, uploadImage, addImage);
router.delete("/delete-image", verifyTokenAdmin, deleteImage);
router.get("/all-user", verifyTokenAdmin, getAllUser);
router.get("/all-admin", verifyTokenAdmin, getAllAdmin);
router.get("/all-writer", verifyTokenAdmin, getAllWriter);
router.get("/all-star", verifyTokenAdmin, getAllStar);
router.get("/all-director", verifyTokenAdmin, getAllDirector);
router.put("/update-movie", verifyTokenAdmin, updateMovie);
router.put("/update-category", verifyTokenAdmin, updateCategory);
router.put("/update-writer", verifyTokenAdmin, updateWriter);
router.put("/update-star", verifyTokenAdmin, updateStar);
router.put("/update-director", verifyTokenAdmin, updateDirector);
router.put("/update-trailer", verifyTokenAdmin, updateTrailer);

module.exports = router;
