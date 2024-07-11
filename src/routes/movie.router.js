const express = require("express");

const router = express.Router();

const {
  movieDetail,
  allMovie,
  moviePlayNow,
} = require("../controllers/movie.controller");
const {
  getAllCategory,
  byCategory,
} = require("../controllers/category.controller");
const { byWriter, getAllWriter } = require("../controllers/writer.controller");
const { byStar, getAllStar } = require("../controllers/star.controller");
const {
  byDirector,
  getAllDirector,
} = require("../controllers/director.controller");

router.get("/all-category", getAllCategory);
router.get("/all-director", getAllDirector);
router.get("/all-writer", getAllWriter);
router.get("/all-star", getAllStar);
router.get("/category/:id_category", byCategory);
router.get("/writer/:id_writer", byWriter);
router.get("/star/:id_star", byStar);
router.get("/director/:id_director", byDirector);
router.get("/playnow", moviePlayNow);
router.get("/:id_movie", movieDetail);
router.get("/", allMovie);

module.exports = router;
