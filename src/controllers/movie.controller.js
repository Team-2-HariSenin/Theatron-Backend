const { where } = require("sequelize");
const {
  movie: MovieModel,
  trailer: TrailerModel,
  director: DirectorModel,
  category: CategoryModel,
  writer: WriterModel,
  star: StarModel,
  sequelize,
} = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const movieDetail = async (req, res, next) => {
  try {
    const { id_movie } = req.params;
    const movie = await MovieModel.findByPk(id_movie, {
      attributes: [
        "id",
        "name",
        "url_poster",
        "url_image",
        "overview",
        [
          sequelize.literal(`(
                SELECT AVG(rates.rate)
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
        [
          sequelize.literal(`(
                SELECT COUNT(watchlists.id)
                FROM watchlists
                WHERE watchlists.id_movie = movie.id
              )`),
          "watchlist_count",
        ],
      ],
      include: [
        {
          model: TrailerModel,
          as: "trailers",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: DirectorModel,
          as: "director",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          association: "writers",
          attributes: { exclude: ["createdAt", "updatedAt"] },
          through: { attributes: [] },
        },
        {
          association: "stars",
          attributes: { exclude: ["createdAt", "updatedAt"] },
          through: { attributes: [] },
        },
        {
          association: "categories",
          attributes: { exclude: ["createdAt", "updatedAt"] },
          through: { attributes: [] },
        },
      ],
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Success", data: movie });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const byCategory = async (req, res, next) => {
  try {
    let { limit } = req.query;
    limit = parseInt(limit) || 10;
    const { id_category } = req.params;

    // Fetch the category first
    const category = await CategoryModel.findByPk(id_category, {
      attributes: ["id", "name"],
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Fetch the associated movies with a limit
    const movies = await MovieModel.findAll({
      attributes: [
        "id",
        "name",
        "url_poster",
        [
          sequelize.literal(`(
            SELECT AVG(rates.rate)
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
          model: CategoryModel,
          as: "categories",
          where: { id: id_category },
          attributes: [],
          through: { attributes: [] },
        },
      ],
      limit,
    });

    // Combine the results and send the response
    res.json({
      message: "Success",
      data: { ...category.toJSON(), movies },
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const byWriter = async (req, res, next) => {
  try {
    let { limit } = req.query;
    limit = parseInt(limit) || 10;
    const { id_writer } = req.params;
    const writer = await WriterModel.findByPk(id_writer, {
      attributes: ["id", "name"],
    });

    if (!writer) {
      return res.status(404).json({ message: "writer not found" });
    }

    // Fetch the associated movies with a limit
    const movies = await MovieModel.findAll({
      attributes: [
        "id",
        "name",
        "url_poster",
        [
          sequelize.literal(`(
            SELECT AVG(rates.rate)
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
          model: WriterModel,
          as: "writers",
          where: { id: id_writer },
          attributes: [],
          through: { attributes: [] },
        },
      ],
      limit,
    });

    res.json({
      message: "Success",
      data: { ...writer.toJSON(), movies },
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const byStar = async (req, res, next) => {
  try {
    let { limit } = req.query;
    limit = parseInt(limit) || 10;
    const { id_star } = req.params;
    const star = await StarModel.findByPk(id_star, {
      attributes: ["id", "name"],
    });

    if (!star) {
      return res.status(404).json({ message: "star not found" });
    }

    // Fetch the associated movies with a limit
    const movies = await MovieModel.findAll({
      attributes: [
        "id",
        "name",
        "url_poster",
        [
          sequelize.literal(`(
            SELECT AVG(rates.rate)
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
          model: StarModel,
          as: "stars",
          where: { id: id_star },
          attributes: [],
          through: { attributes: [] },
        },
      ],
      limit,
    });

    res.json({
      message: "Success",
      data: { ...star.toJSON(), movies },
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const byDirector = async (req, res, next) => {
  try {
    let { limit } = req.query;
    limit = parseInt(limit) || 10;
    const { id_director } = req.params;

    // Fetch the director first
    const director = await DirectorModel.findByPk(id_director, {
      attributes: ["id", "name"],
    });

    if (!director) {
      return res.status(404).json({ message: "Director not found" });
    }

    // Fetch the associated movies with a limit
    const movies = await MovieModel.findAll({
      attributes: [
        "id",
        "name",
        "url_poster",
        [
          sequelize.literal(`(
            SELECT AVG(rates.rate)
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
          model: DirectorModel,
          as: "director",
          where: { id: id_director },
          attributes: [],
        },
      ],
      limit,
    });

    // Combine the results and send the response
    res.json({
      message: "Success",
      data: { ...director.toJSON(), movies },
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

module.exports = { movieDetail, byCategory, byWriter, byDirector, byStar };
