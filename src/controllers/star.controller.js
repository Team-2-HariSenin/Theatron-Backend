const { sequelize } = require("../models");
const { star: StarModel } = require("../models");

const { Op } = require("sequelize");

const addStar = async (req, res, next) => {
  const { name } = req.body;
  const transaction = await sequelize.transaction();
  try {
    const star = await StarModel.create(
      {
        name,
      },
      { transaction }
    );
    await transaction.commit();
    res.status(201).json({ message: "Star added successfully", data: star });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const getAllStar = async (req, res, next) => {
  let { keyword, page, limit } = req.query;
  // Set default value for page and limit
  page = parseInt(page || 1);
  limit = parseInt(limit || 10);
  try {
    const query = {
      attributes: [
        "id",
        "name",
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM movie_stars AS ms
            WHERE ms.id_star = star.id
          )`),
          "total_movie",
        ],
      ],
      order: [["name", "ASC"]],
      offset: (page - 1) * limit,
      limit,
    };

    if (keyword) {
      query.where = {
        name: {
          [Op.like]: `%${keyword}%`,
        },
      };
    }
    const stars = await StarModel.findAll(query);

    // Get Total Star count with potential keyword filtering
    const total = keyword
      ? await StarModel.count({
          where: {
            name: {
              [Op.like]: `%${keyword}%`,
            },
          },
        })
      : await StarModel.count();
    res.json({
      message: "Success",
      data: {
        stars,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const updateStar = async (req, res, next) => {
  try {
    const { id, name } = req.body;

    console.log(req.body);

    // Cari film berdasarkan ID
    const Star = await StarModel.findByPk(id);
    if (!Star) {
      return res.status(404).json({ message: "Star not found" });
    }

    // Perbarui data film

    if (name) {
      Star.name = name;
    }

    // Simpan perubahan data film
    await Star.save();

    // Dapatkan data terbaru untuk respon
    const updatedStar = await StarModel.findByPk(id, {
      attributes: ["id", "name"],
    });

    res.json({ message: "Success", data: updatedStar });
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

module.exports = {
  addStar,
  updateStar,
  getAllStar,
  byStar,
};
