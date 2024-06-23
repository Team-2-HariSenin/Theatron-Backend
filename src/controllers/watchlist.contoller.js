const { where } = require("sequelize");
const {
  movie: MovieModel,
  watchlist: WatchlistModel,
  user: UserModel,
  sequelize,
} = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

const index = async (req, res, next) => {
  try {
    let { limit } = req.query;
    limit = parseInt(limit) || 10;
    const id_user = req.user.id;

    const user = await UserModel.findByPk(id_user, {
      attributes: ["id", "name"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const movies = await MovieModel.findAll({
      attributes: [
        "id",
        "name",
        "url_poster",
        [
          sequelize.literal(`(
            SELECT IFNULL(AVG(rates.rate), 0)
            FROM rates
            WHERE rates.id_movie = movie.id
          )`),
          "rate_average",
        ],
        [
          sequelize.literal(`(
            SELECT COUNT(rates.id)
            FROM rates
            WHERE rates.id_movie = movie.id
          )`),
          "rate_count",
        ],
      ],
      include: [
        {
          model: WatchlistModel,
          as: "watchlists",
          where: { id_user: id_user },
          attributes: [],
        },
      ],
      limit,
    });

    res.json({ message: "Success", data: { ...user.toJSON(), movies } });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const chekWatchlist = async (req, res, next) => {
  try {
    const id_user = req.user.id;
    let { id_movie } = req.params;
    id_movie = parseInt(id_movie);
    console.log(id_movie);
    if (!id_movie) {
      return res.status(400).json({ message: "Please select the movie" });
    }
    const existingMovie = await MovieModel.findOne({
      where: { id: id_movie },
    });

    if (!existingMovie) {
      return res.status(400).json({ message: "Movie not found" });
    }
    // Check if the like already exists
    const existingWatchlist = await WatchlistModel.findOne({
      where: { id_user, id_movie },
    });
    if (existingWatchlist) {
      return res.json({
        data: { watchlist: true },
      });
    }
    res.json({
      data: { watchlist: false },
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const watchlistToggle = async (req, res, next) => {
  try {
    const id_user = req.user.id;
    let { id_movie } = req.query;
    id_movie = parseInt(id_movie);
    if (!id_movie) {
      return res.status(400).json({ message: "Please select the movie" });
    }
    const existingMovie = await MovieModel.findOne({
      where: { id: id_movie },
    });

    if (!existingMovie) {
      return res.status(400).json({ message: "Movie not found" });
    }
    // Check if the like already exists
    const existingWatchlist = await WatchlistModel.findOne({
      where: { id_user, id_movie },
    });
    if (existingWatchlist) {
      existingWatchlist.destroy();
      return res.json({
        message: "Successfully removed movie from watchlist",
        data: {
          id_user: existingWatchlist.id_user,
          id_movie: existingWatchlist.id_movie,
          watchlist: false,
        },
      });
    }

    const addToWatchlist = await WatchlistModel.create({ id_user, id_movie });
    res.json({
      message: "Successfully added movie to watchlist",
      data: {
        id_user: addToWatchlist.id_user,
        id_movie: addToWatchlist.id_movie,
        watchlist: true,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

module.exports = { index, chekWatchlist, watchlistToggle };
