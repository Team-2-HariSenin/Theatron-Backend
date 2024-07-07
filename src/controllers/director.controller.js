const { sequelize } = require("../models");
const { director: DirectorModel } = require("../models");
const { Op } = require("sequelize");

const addDirector = async (req, res, next) => {
  const { name } = req.body;
  const transaction = await sequelize.transaction();
  try {
    const director = await DirectorModel.create(
      {
        name,
      },
      { transaction }
    );
    await transaction.commit();
    res
      .status(201)
      .json({ message: "Director added successfully", data: director });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const getAllDirector = async (req, res, next) => {
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
            FROM movies AS m
            WHERE m.id_director = director.id
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

    const directors = await DirectorModel.findAll(query);

    // Get total count of directors with optional keyword filtering
    const total = keyword
      ? await DirectorModel.count({
          where: {
            name: {
              [Op.like]: `%${keyword}%`,
            },
          },
        })
      : await DirectorModel.count();

    res.json({
      message: "Success",
      data: {
        directors,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const updateDirector = async (req, res, next) => {
  try {
    const { id, name } = req.body;

    console.log(req.body);

    // Cari film berdasarkan ID
    const Director = await DirectorModel.findByPk(id);
    if (!Director) {
      return res.status(404).json({ message: "Director not found" });
    }

    // Perbarui data film

    if (name) {
      Director.name = name;
    }

    // Simpan perubahan data film
    await Director.save();

    // Dapatkan data terbaru untuk respon
    const updatedDirector = await DirectorModel.findByPk(id, {
      attributes: ["id", "name"],
    });

    res.json({ message: "Success", data: updatedDirector });
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

module.exports = {
  addDirector,
  updateDirector,
  getAllDirector,
  byDirector,
};
