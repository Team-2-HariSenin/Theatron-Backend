const { sequelize } = require("../models");
const { writer: WriterModel } = require("../models");
const { Op } = require("sequelize");

const addWriter = async (req, res, next) => {
  const { name } = req.body;
  const transaction = await sequelize.transaction();
  try {
    const writer = await WriterModel.create(
      {
        name,
      },
      { transaction }
    );
    await transaction.commit();
    res
      .status(201)
      .json({ message: "Writer added successfully", data: writer });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const getAllWriter = async (req, res, next) => {
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
            FROM movie_writers AS mw
            WHERE mw.id_writer = writer.id
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
    const writers = await WriterModel.findAll(query);

    // Get Total Writer count with potential keyword filtering
    const total = keyword
      ? await WriterModel.count({
          where: {
            name: {
              [Op.like]: `%${keyword}%`,
            },
          },
        })
      : await WriterModel.count();

    res.json({
      message: "Success",
      data: {
        writers,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const updateWriter = async (req, res, next) => {
  try {
    const { id, name } = req.body;

    console.log(req.body);

    // Cari film berdasarkan ID
    const Writer = await WriterModel.findByPk(id);
    if (!Writer) {
      return res.status(404).json({ message: "Writer not found" });
    }

    // Perbarui data film

    if (name) {
      Writer.name = name;
    }

    // Simpan perubahan data film
    await Writer.save();

    // Dapatkan data terbaru untuk respon
    const updatedWriter = await WriterModel.findByPk(id, {
      attributes: ["id", "name"],
    });

    res.json({ message: "Success", data: updatedWriter });
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

module.exports = {
  addWriter,
  updateWriter,
  getAllWriter,
  byWriter,
};
