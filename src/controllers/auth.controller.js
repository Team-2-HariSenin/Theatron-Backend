const { user: UserModel, admin: AdminModel, sequelize } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  console.log("passwordHash", passwordHash);
  await UserModel.create({
    name,
    email,
    password: passwordHash,
  })
    .then((user) => {
      if (!user) {
        return res.status(500).send({
          message: "Failed to register user",
          data: null,
        });
      }

      return res.status(201).send({
        message: "User successfully registered",
        data: null,
      });
    })
    .catch((err) => {
      next(err);
    });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for admin first
    let user = await AdminModel.findOne({
      attributes: ["id", "name", "email", "password"],
      where: { email },
    });

    if (!user) {
      // If not found, check for normal user
      user = await UserModel.findOne({
        attributes: ["id", "name", "email", "password"],
        where: { email },
      });

      if (!user) {
        return res.status(401).send({
          message: "Invalid email / password",
          data: null,
        });
      }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Invalid email / password",
        data: null,
      });
    }

    const token = jwt.sign(
      user instanceof AdminModel
        ? { id: user.id, name: user.name, email: user.email, isAdmin: true }
        : { id: user.id, name: user.name, email: user.email, isAdmin: false },
      process.env.JWT_SECRET
    );

    return res.send({
      message: `${
        user instanceof AdminModel ? "Admin" : "User"
      } successfully logged in`,
      data: { token },
    });
  } catch (err) {
    next(err);
  }
};

const getAllUser = async (req, res, next) => {
  let { keyword, page, limit } = req.query;
  // Set default value for page and limit
  page = parseInt(page || 1);
  limit = parseInt(limit || 10);

  try {
    const query = {
      attributes: [
        "id",
        "name",
        "email",
        [
          sequelize.literal(`(
            SELECT COUNT(rates.id)
            FROM rates
            WHERE rates.id_user = user.id
          )`),
          "total_rate",
        ],
        [
          sequelize.literal(`(
            SELECT COUNT(watchlists.id)
            FROM watchlists
            WHERE watchlists.id_user = user.id
          )`),
          "total_watchlist",
        ],
      ],
      offset: (page - 1) * limit,
      limit,
      order: [["name", "ASC"]],
    };
    // Add where clause if keyword is provided
    if (keyword) {
      query.where = {
        email: {
          [Op.like]: `%${keyword}%`,
        },
      };
    }
    const users = await UserModel.findAll(query);

    // Get Total User count with potential keyword filtering
    const total = keyword
      ? await UserModel.count({
          where: {
            name: {
              [Op.like]: `%${keyword}%`,
            },
          },
        })
      : await UserModel.count();
    res.json({
      message: "Success",
      data: { users, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

module.exports = { register, login, getAllUser };
