const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");

const { cors } = require("./middlewares/app");
const authRouter = require("./routes/auth.router.js");
const movieRouter = require("./routes/movie.router.js");
const watchlistRouter = require("./routes/watchlist.router.js");
const rateRouter = require("./routes/rate.router.js");
const adminRouter = require("./routes/admin.router.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors);

if (!process.env.JWT_SECRET) {
  console.error(
    "JWT_SECRET is not provided, fill it with random string or generate it using 'openssl rand -base64 32'"
  );
  process.exit(1);
}

app.use("/api/auth", authRouter);
app.use("/api/movie", movieRouter);
app.use("/api/watchlist", watchlistRouter);
app.use("/api/rate", rateRouter);
app.use("/api/admin", adminRouter);

app.post("/test", (req, res) => {
  console.log(req.body);
});

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log("Server Running");
});
