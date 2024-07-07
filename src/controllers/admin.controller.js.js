const { admin: AdminModel } = require("../models");
const { Op } = require("sequelize");

const addAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  console.log("passwordHash", passwordHash);
  await AdminModel.create({
    name,
    email,
    password: passwordHash,
  })
    .then((user) => {
      if (!user) {
        return res.status(500).send({
          message: "Failed to add Admin",
          data: null,
        });
      }

      return res.status(201).send({
        message: "Admin successfully added",
        data: null,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getAllAdmin = async (req, res, next) => {
  let { keyword, page, limit } = req.query;
  // Set default value for page and limit
  page = parseInt(page || 1);
  limit = parseInt(limit || 10);

  try {
    const query = {
      attributes: ["id", "name", "email"],
      offset: (page - 1) * limit,
      limit,
      order: [["name", "ASC"]],
    };
    if (keyword) {
      query.where = {
        email: {
          [Op.like]: `%${keyword}%`,
        },
      };
    }
    const admins = await AdminModel.findAll(query);

    // Get Total Admin count with potential keyword filtering
    const total = keyword
      ? await AdminModel.count({
          where: {
            name: {
              [Op.like]: `%${keyword}%`,
            },
          },
        })
      : await AdminModel.count();
    res.json({
      message: "Success",
      data: { admins, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

module.exports = {
  getAllAdmin,
  addAdmin,
};
