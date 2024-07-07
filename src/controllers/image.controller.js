const cloudinary = require("../config/cloudinary");
const { sequelize } = require("../models");
const { movie: MovieModel } = require("../models");

const addImage = async (req, res, next) => {
  const { id_movie, url_image, url_poster } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const movie = await MovieModel.findOne({
      where: { id: id_movie },
      transaction,
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    movie.url_image = url_image;
    movie.url_poster = url_poster;
    await movie.save({ transaction });

    await transaction.commit();
    return res.status(201).json({
      message: "Image added successfully",
      data: movie,
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ message: "Error", error: error.message });
  }
};

const deleteImage = async (req, res) => {
  const { id_movie, url, type } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  const extractPublicIdFromUrl = (url) => {
    const urlSegments = url.split("/");
    const fileName = urlSegments[urlSegments.length - 1].split(".")[0];
    const folder = urlSegments[urlSegments.length - 2];
    return `${folder}/${fileName}`;
  };
  const publicId = extractPublicIdFromUrl(url);

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    const Movie = await MovieModel.findByPk(id_movie);

    if (type === "banner") {
      Movie.url_image = null;
    } else if (type === "poster") {
      Movie.url_poster = null;
    }

    await Movie.save();

    res.status(200).json({ message: "Image deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Error deleting image", error });
  }
};

module.exports = { addImage, deleteImage };
