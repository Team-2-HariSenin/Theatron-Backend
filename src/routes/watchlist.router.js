const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/auth");
const {
  index,
  watchlistToggle,
  chekWatchlist,
} = require("../controllers/watchlist.contoller");

router.get("/", verifyToken, index);
router.get("/:id_movie", verifyToken, chekWatchlist);
router.post("/toggle", verifyToken, watchlistToggle);

module.exports = router;
