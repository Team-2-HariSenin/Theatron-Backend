const { Op } = require("sequelize");
const { sequelize } = require("../models");
const { category: CategoryModel, movie: MovieModel } = require("../models");

const addCategory = async (req, res, next) => {
  const { name } = req.body;
  const transaction = await sequelize.transaction();
  try {
    const category = await CategoryModel.create(
      {
        name,
      },
      { transaction }
    );
    await transaction.commit();
    res
      .status(201)
      .json({ message: "Category added successfully", data: category });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const getAllCategory = async (req, res, next) => {
  let { id_category, keyword, page, limit } = req.query;
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
            FROM movie_categories AS mc
            WHERE mc.id_category = category.id
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
          [Op.like]: `${keyword}%`,
        },
      };
    }

    if (id_category) {
      query.where = {
        id: id_category,
      };
    }

    const categories = await CategoryModel.findAll(query);

    // Get Total Category count with potential keyword filtering
    const total = keyword
      ? await CategoryModel.count({
          where: {
            name: {
              [Op.like]: `${keyword}%`,
            },
          },
        })
      : await CategoryModel.count();

    res.json({
      message: "Success",
      data: {
        categories,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const categoryDetail = async (req, res, next) => {
  try {
    const { id_movie } = req.params;
    const category = await CategoryModel.findByPk(id_category, {
      attributes: ["id", "name"],
    });

    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }

    res.json({ message: "Success", data: category });
  } catch (error) {}
};

const updateCategory = async (req, res, next) => {
  try {
    const { id, name } = req.body;

    console.log(req.body);

    // Cari film berdasarkan ID
    const category = await CategoryModel.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Perbarui data film

    if (name) {
      category.name = name;
    }

    // Simpan perubahan data film
    await category.save();

    // Dapatkan data terbaru untuk respon
    const updatedCategory = await CategoryModel.findByPk(id, {
      attributes: ["id", "name"],
    });

    res.json({ message: "Success", data: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const byCategory = async (req, res, next) => {
  try {
    let { page, limit } = req.query;
    // Set default value for page and limit
    page = parseInt(page || 1);
    limit = parseInt(limit || 10);
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
      offset: (page - 1) * limit,
      limit,
      order: [[MovieModel.sequelize.literal("rate_count"), "DESC"]],
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

module.exports = {
  addCategory,
  updateCategory,
  getAllCategory,
  categoryDetail,
  byCategory,
};
