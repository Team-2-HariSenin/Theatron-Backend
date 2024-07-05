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

module.exports = addImage;
