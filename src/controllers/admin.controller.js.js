const { sequelize } = require("../models");
const {
  movie: MovieModel,
  director: DirectorModel,
  writer: WriterModel,
  star: StarModel,
  category: CategoryModel,
  movie_writer: MovieWriterModel,
  movie_star: MovieStarModel,
  movie_category: MovieCategoryModel,
} = require("../models");

const addMovie = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      name,
      overview,
      url_poster,
      url_image,
      director,
      writer,
      star,
      category,
    } = req.body;

    let movie;
    let directorData;

    if (typeof director.id === "number") {
      movie = await MovieModel.create(
        { attributes: ["id", "name", "overview", "url_poster", "url_image"] },
        {
          name,
          overview,
          url_poster,
          url_image,
          id_director: director.id,
        },
        { transaction }
      );

      directorData = await DirectorModel.findOne({
        attributes: ["id", "name"],
        where: { id: director.id },
        transaction,
      });
    } else if (director.name) {
      const createDirector = await DirectorModel.create(
        {
          name: director.name,
        },
        { transaction }
      );

      movie = await MovieModel.create(
        { attributes: ["id", "name", "overview", "url_poster", "url_image"] },
        {
          name,
          overview,
          url_poster,
          url_image,
          id_director: createDirector.id,
        },
        { transaction }
      );

      directorData = await DirectorModel.findOne({
        attributes: ["id", "name"],
        where: { id: createDirector.id },
        transaction,
      });
    } else {
      movie = await MovieModel.create(
        { attributes: ["id", "name", "overview", "url_poster", "url_image"] },
        {
          name,
          overview,
          url_poster,
          url_image,
        },
        { transaction }
      );
    }

    const writers = await Promise.all(
      writer.map(async (w) => {
        let writerData;
        if (typeof w.id === "number") {
          await MovieWriterModel.create(
            {
              id_movie: movie.id,
              id_writer: w.id,
            },
            { transaction }
          );
          writerData = await WriterModel.findOne({
            attributes: ["id", "name"],
            where: { id: w.id },
            transaction,
          });
        } else if (w.name) {
          const createWriter = await WriterModel.create(
            {
              name: w.name,
            },
            { transaction }
          );
          await MovieWriterModel.create(
            {
              id_movie: movie.id,
              id_writer: createWriter.id,
            },
            { transaction }
          );
          writerData = await WriterModel.findOne({
            attributes: ["id", "name"],
            where: { id: createWriter.id },
            transaction,
          });
        }
        return writerData;
      })
    );

    const stars = await Promise.all(
      star.map(async (s) => {
        let starData;
        if (typeof s.id === "number") {
          await MovieStarModel.create(
            {
              id_movie: movie.id,
              id_star: s.id,
            },
            { transaction }
          );
          starData = await StarModel.findOne({
            attributes: ["id", "name"],
            where: { id: s.id },
            transaction,
          });
        } else if (s.name) {
          const createStar = await StarModel.create(
            {
              name: s.name,
            },
            { transaction }
          );
          await MovieStarModel.create(
            {
              id_movie: movie.id,
              id_star: createStar.id,
            },
            { transaction }
          );
          starData = await StarModel.findOne({
            attributes: ["id", "name"],
            where: { id: createStar.id },
            transaction,
          });
        }
        return starData;
      })
    );

    const categories = await Promise.all(
      category.map(async (c) => {
        let categoryData;
        if (typeof c.id === "number") {
          await MovieCategoryModel.create(
            {
              id_movie: movie.id,
              id_category: c.id,
            },
            { transaction }
          );
          categoryData = await CategoryModel.findOne({
            attributes: ["id", "name"],
            where: { id: c.id },
            transaction,
          });
        } else if (c.name) {
          const createCategory = await CategoryModel.create(
            {
              name: c.name,
            },
            { transaction }
          );
          await MovieCategoryModel.create(
            {
              id_movie: movie.id,
              id_category: createCategory.id,
            },
            { transaction }
          );
          categoryData = await CategoryModel.findOne({
            attributes: ["id", "name"],
            where: { id: createCategory.id },
            transaction,
          });
        }
        return categoryData;
      })
    );

    await transaction.commit();

    return res.json({
      message: "Movie added successfully",
      data: { movie, director: directorData, stars, writers, categories },
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error", error: error.message });
  }
};

module.exports = { addMovie };
