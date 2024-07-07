const express = require("express");

const router = express.Router();

const { movieDetail, allMovie } = require("../controllers/movie.controller");
const {
  getAllCategory,
  byCategory,
} = require("../controllers/category.controller");
const { byWriter } = require("../controllers/writer.controller");
const { byStar } = require("../controllers/star.controller");
const { byDirector } = require("../controllers/director.controller");

router.get("/all-category", getAllCategory);
router.get("/category/:id_category", byCategory);
router.get("/writer/:id_writer", byWriter);
router.get("/star/:id_star", byStar);
router.get("/director/:id_director", byDirector);
router.get("/:id_movie", movieDetail);
router.get("/", allMovie);

module.exports = router;
