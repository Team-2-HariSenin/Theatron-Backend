const jwt = require("jsonwebtoken");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"] || "";

    if (authHeader.split(" ").length !== 2) {
      return res.status(401).send({
        message: "Invalid token",
        data: null,
      });
    }

    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
      return res.status(401).send({
        message: "Invalid token",
        data: null,
      });
    }

    // Save decoded user to request object
    req.user = user;

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).send({
        message: "Invalid token",
        data: null,
      });
    }

    next(err);
  }
};

const verifyTokenAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"] || "";

    if (authHeader.split(" ").length !== 2) {
      return res.status(401).send({
        message: "Invalid token",
        data: null,
      });
    }

    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
      return res.status(401).send({
        message: "Invalid token",
        data: null,
      });
    }

    if (!user.isAdmin) {
      return res.status(401).send({
        message: "You are not an admin",
        data: null,
      });
    }

    // Save decoded user to request object
    req.user = user;

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).send({
        message: "Invalid token",
        data: null,
      });
    }

    next(err);
  }
};

module.exports = { verifyToken, verifyTokenAdmin };
