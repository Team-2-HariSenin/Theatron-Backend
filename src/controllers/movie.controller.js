const { sequelize } = require("../models");
const {
  movie: MovieModel,
  director: DirectorModel,
  writer: WriterModel,
  star: StarModel,
  category: CategoryModel,
  movie_writer: MovieWriterModel,
  movie_star: MovieStarModel,
  movie_category: MovieCategoryModel,
  trailer: TrailerModel,
} = require("../models");
const { Op } = require("sequelize");

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

const addMovie = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const { name, overview, director, writer, star, category } = req.body;

  let movie;
  let directorData;
  try {
    if (typeof director === "number") {
      movie = await MovieModel.create(
        {
          name,
          overview,
          id_director: director,
        },
        { transaction }
      );
      directorData = await DirectorModel.findOne({
        attributes: ["id", "name"],
        where: { id: director },
        transaction,
      });
    } else {
      movie = await MovieModel.create(
        {
          name,
          overview,
        },
        { transaction }
      );
    }

    const writers = await Promise.all(
      writer.map(async (w) => {
        let writerData;
        if (typeof w === "number") {
          await MovieWriterModel.create(
            {
              id_movie: movie.id,
              id_writer: w,
            },
            { transaction }
          );
          writerData = await WriterModel.findOne({
            attributes: ["id", "name"],
            where: { id: w },
            transaction,
          });
        }
        return writerData;
      })
    );

    const stars = await Promise.all(
      star.map(async (s) => {
        let starData;
        if (typeof s === "number") {
          await MovieStarModel.create(
            {
              id_movie: movie.id,
              id_star: s,
            },
            { transaction }
          );
          starData = await StarModel.findOne({
            attributes: ["id", "name"],
            where: { id: s },
            transaction,
          });
        }
        return starData;
      })
    );

    const categories = await Promise.all(
      category.map(async (c) => {
        let categoryData;
        if (typeof c === "number") {
          await MovieCategoryModel.create(
            {
              id_movie: movie.id,
              id_category: c,
            },
            { transaction }
          );
          categoryData = await CategoryModel.findOne({
            attributes: ["id", "name"],
            where: { id: c },
            transaction,
          });
        }
        return categoryData;
      })
    );

    await transaction.commit();

    return res.status(201).json({
      message: "Movie added successfully",
      data: {
        ...movie.toJSON(),
        director: directorData,
        writers,
        stars,
        categories,
      },
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const {
      id,
      name,
      url_poster,
      url_image,
      overview,
      id_director,
      writerIds,
      starIds,
      categoryIds,
    } = req.body;

    console.log(req.body);

    // Cari film berdasarkan ID
    const movie = await MovieModel.findByPk(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Perbarui data film
    movie.name = name || movie.name;
    movie.url_poster = url_poster || movie.url_poster;
    movie.url_image = url_image || movie.url_image;
    movie.overview = overview || movie.overview;
    movie.id_director = id_director || movie.id_director;

    // Simpan perubahan data film
    await movie.save();

    // Perbarui relasi dengan writers
    if (writerIds) {
      const writers = await WriterModel.findAll({ where: { id: writerIds } });
      await movie.setWriters(writers);
    }

    // Perbarui relasi dengan stars
    if (starIds) {
      const stars = await StarModel.findAll({ where: { id: starIds } });
      await movie.setStars(stars);
    }

    // Perbarui relasi dengan categories
    if (categoryIds) {
      const categories = await CategoryModel.findAll({
        where: { id: categoryIds },
      });
      await movie.setCategories(categories);
    }

    // Dapatkan data terbaru untuk respon
    const updatedMovie = await MovieModel.findByPk(id, {
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

    res.json({ message: "Success", data: updatedMovie });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const allMovie = async (req, res, next) => {
  try {
    let { keyword, page, limit } = req.query;
    // Set default value for page and limit
    page = parseInt(page || 1);
    limit = parseInt(limit || 10);

    const query = {
      attributes: [
        "id",
        "name",
        "url_poster",
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
            SELECT AVG(rates.rate)
            FROM rates
            WHERE rates.id_movie = movie.id
          )`),
          "rate_average",
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
      offset: (page - 1) * limit,
      limit,
      order: [[MovieModel.sequelize.literal("rate_count"), "DESC"]],
    };

    // Add where clause if keyword is provided
    if (keyword) {
      query.where = {
        name: {
          [Op.like]: `%${keyword}%`,
        },
      };
    }

    // Fetch the associated movies with a limit
    const movies = await MovieModel.findAll(query);

    // Get Total Writer count with potential keyword filtering
    const total = keyword
      ? await MovieModel.count({
          where: {
            name: {
              [Op.like]: `%${keyword}%`,
            },
          },
        })
      : await MovieModel.count();

    // Combine the results and send the response
    res.json({
      message: "Success",
      data: { movies, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

module.exports = {
  movieDetail,
  allMovie,
  addMovie,
  updateMovie,
};
