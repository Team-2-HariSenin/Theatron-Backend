const { toSeconds, parse } = require("iso8601-duration");
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
  trailer: TrailerModel,
} = require("../models");
const axios = require("axios");

const addMovie = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const { name, overview, director, writer, star, category } = req.body;

  let movie;
  let directorData;
  try {
    if (typeof director.id === "number") {
      movie = await MovieModel.create(
        {
          name,
          overview,

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
        {
          name,
          overview,

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
        {
          name,
          overview,
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
      data: movie,
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const addTrailer = async (req, res, next) => {
  const { youtubeId, id_movie } = req.body;

  const getUser = async function (youtubeId) {
    try {
      const response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${youtubeId}&key=${process.env.YT_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching YouTube data:",
        error.response ? error.response.data : error.message
      );
      throw new Error("Failed to fetch YouTube data");
    }
  };

  const formatDuration = (duration) => {
    const durationInSeconds = toSeconds(parse(duration));
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const secs = (durationInSeconds % 60).toFixed(0);
    console.log(duration);

    return `${hours > 0 ? `${hours}.` : ""}${
      minutes < 10 && hours > 0 ? "0" : ""
    }${minutes}.${secs < 10 ? "0" : ""}${secs}`;
  };

  const transaction = await sequelize.transaction();

  try {
    const checkMovieExist = await MovieModel.findOne({
      attributes: ["id", "name"],
      where: { id: id_movie },
      transaction,
    });

    if (!youtubeId || !id_movie || !checkMovieExist) {
      return res.status(400).json({ message: "Failed", data: null });
    }

    const trailers = await Promise.all(
      youtubeId.map(async (id) => {
        const checkKeyExists = await TrailerModel.findOne({
          where: { id_movie, key: id },
          transaction,
        });
        if (checkKeyExists) {
          return "Trailer already exists";
        }

        const youtubeData = await getUser(id);
        if (!youtubeData) {
          return "Failed to fetch YouTube data";
        } else {
          const item = youtubeData.items[0];
          if (!item) {
            throw new Error(`${id} is not a valid YouTube ID`);
          }

          return TrailerModel.create(
            {
              id_movie,
              title: item.snippet.title,
              duration: formatDuration(item.contentDetails.duration),
              key: id,
            },
            { transaction }
          );
        }
      })
    );

    await transaction.commit();
    res.json({ message: "Trailer Added successfully", data: trailers });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error", error: error.message });
  }
};

module.exports = { addMovie, addTrailer };
