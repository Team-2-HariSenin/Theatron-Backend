const { isEmail, isStrongPassword } = require("validator");
const { user: UserModel, admin: AdminModel } = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const validateUpdateUser = async (req, res, next) => {
  const { name, email, oldPassword, newPassword } = req.body;

  if (!name) {
    return res.status(400).send({
      message: "Name is required",
      data: null,
    });
  }

  if (!email) {
    return res.status(400).send({
      message: "Email is required",
      data: null,
    });
  }

  if (!isEmail(email)) {
    return res.status(400).send({
      message: "Invalid email",
      data: null,
    });
  }

  if (
    newPassword &&
    !isStrongPassword(newPassword, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
  ) {
    return res.status(400).send({
      message: "New password is too weak",
      data: null,
    });
  }

  if (oldPassword && !newPassword) {
    return res.status(400).send({
      message: "New password is required when old password is provided",
      data: null,
    });
  }

  const emailCheck = await UserModel.findOne({
    where: { email },
  });

  if (emailCheck && emailCheck.id !== req.user.id) {
    return res.status(400).send({
      message: "Email already registered",
      data: null,
    });
  }

  next();
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const validateRegister = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({
      message: "Name, email, and password are required",
      data: null,
    });
  }

  if (!isEmail(email)) {
    return res.status(400).send({
      message: "Invalid email",
      data: null,
    });
  }

  if (
    !isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
  ) {
    return res.status(400).send({
      message: "Password is too weak",
      data: null,
    });
  }

  const emailCheck = await UserModel.findOne({
    where: { email },
  });
  if (emailCheck) {
    return res.status(400).send({
      message: "Email already registered",
      data: null,
    });
  }

  next();
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const validateRegisterAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({
      message: "Name, email, and password are required",
      data: null,
    });
  }

  if (!isEmail(email)) {
    return res.status(400).send({
      message: "Invalid email",
      data: null,
    });
  }

  if (
    !isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
  ) {
    return res.status(400).send({
      message: "Password is too weak",
      data: null,
    });
  }

  const emailCheck = await AdminModel.findOne({
    where: { email },
  });
  if (emailCheck) {
    return res.status(400).send({
      message: "Email already registered",
      data: null,
    });
  }

  next();
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "Email and password are required",
      data: null,
    });
  }

  if (!isEmail(email)) {
    return res.status(400).send({
      message: "Invalid email",
      data: null,
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateRegisterAdmin,
  validateLogin,
  validateUpdateUser,
};
