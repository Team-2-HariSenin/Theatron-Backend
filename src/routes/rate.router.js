const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/auth");
const { index } = require("../controllers/rate.controller");

router.post("/", verifyToken, index);

module.exports = router;
