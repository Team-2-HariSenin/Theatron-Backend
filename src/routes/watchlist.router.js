const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/auth");
const {
  index,
  watchlistToggle,
  chekWatchlist,
} = require("../controllers/watchlist.contoller");

router.post("/toggle", verifyToken, watchlistToggle);
router.get("/:id_movie", verifyToken, chekWatchlist);
router.get("/", verifyToken, index);

module.exports = router;
