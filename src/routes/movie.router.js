const express = require("express");

const router = express.Router();

const {
  movieDetail,
  allMovie,
  byCategory,
  byWriter,
  byStar,
  byDirector,
  getAllCategory,
} = require("../controllers/movie.controller");

router.get("/", allMovie);
router.get("/all-category", getAllCategory);
router.get("/:id_movie", movieDetail);
router.get("/category/:id_category", byCategory);
router.get("/writer/:id_writer", byWriter);
router.get("/star/:id_star", byStar);
router.get("/director/:id_director", byDirector);

module.exports = router;
