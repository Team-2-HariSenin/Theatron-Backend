const { rate: RateModel } = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

const index = async (req, res, next) => {
  try {
    const id_user = req.user.id;
    const { id_movie } = req.query;

    // Check if the rating already exists
    const rating = await RateModel.findOne({
      where: { id_user, id_movie },
      attributes: ["id_user", "id_movie", "rate"],
    });

    if (!rating) {
      return res.json({ message: "Rating not found", data: null });
    }

    return res.json({ message: "Success", data: rating });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const addRate = async (req, res, next) => {
  try {
    const id_user = req.user.id;
    const { id_movie, rate } = req.body;

    // Check if the rating already exists
    let rating = await RateModel.findOne({
      where: { id_user, id_movie },
      attributes: ["id_user", "id_movie", "rate"],
    });

    if (rating) {
      // Update existing rating
      rating.rate = rate;
      await rating.save();
      return res.json({ message: "Rating updated successfully", data: rating });
    } else {
      // Create new rating
      rating = await RateModel.create({ id_user, id_movie, rate });
      return res.json({ message: "Rating added successfully", data: rating });
    }
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const deleteRate = async (req, res, next) => {
  try {
    const id_user = req.user.id;
    const { id_movie, rate } = req.body;

    // Check if the rating not exists
    const rating = await RateModel.findOne({
      where: { id_user, id_movie },
      attributes: ["id_user", "id_movie", "rate"],
    });

    if (!rating) {
      return res.json({ message: "Rating not found", data: null });
    }

    rating.destroy();
    return res.json({ message: "Rating deleted successfully", data: rating });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

module.exports = { index, addRate, deleteRate };
