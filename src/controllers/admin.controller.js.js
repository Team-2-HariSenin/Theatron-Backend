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
  user: UserModel,
  admin: AdminModel,
} = require("../models");
const axios = require("axios");
const { Op } = require("sequelize");

const addMovie = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const { name, overview, director, writer, star, category } = req.body;

  let movie;
  let directorData;
  try {
    if (typeof director === "number") {
      movie = await MovieModel.create(
        {
          name,
          overview,
          id_director: director,
        },
        { transaction }
      );
      directorData = await DirectorModel.findOne({
        attributes: ["id", "name"],
        where: { id: director },
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
        if (typeof w === "number") {
          await MovieWriterModel.create(
            {
              id_movie: movie.id,
              id_writer: w,
            },
            { transaction }
          );
          writerData = await WriterModel.findOne({
            attributes: ["id", "name"],
            where: { id: w },
            transaction,
          });
        }
        return writerData;
      })
    );

    const stars = await Promise.all(
      star.map(async (s) => {
        let starData;
        if (typeof s === "number") {
          await MovieStarModel.create(
            {
              id_movie: movie.id,
              id_star: s,
            },
            { transaction }
          );
          starData = await StarModel.findOne({
            attributes: ["id", "name"],
            where: { id: s },
            transaction,
          });
        }
        return starData;
      })
    );

    const categories = await Promise.all(
      category.map(async (c) => {
        let categoryData;
        if (typeof c === "number") {
          await MovieCategoryModel.create(
            {
              id_movie: movie.id,
              id_category: c,
            },
            { transaction }
          );
          categoryData = await CategoryModel.findOne({
            attributes: ["id", "name"],
            where: { id: c },
            transaction,
          });
        }
        return categoryData;
      })
    );

    await transaction.commit();

    return res.status(201).json({
      message: "Movie added successfully",
      data: {
        ...movie.toJSON(),
        director: directorData,
        writers,
        stars,
        categories,
      },
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
    res
      .status(201)
      .json({ message: "Trailer Added successfully", data: trailers });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const addDirector = async (req, res, next) => {
  const { name } = req.body;
  const transaction = await sequelize.transaction();
  try {
    const director = await DirectorModel.create(
      {
        name,
      },
      { transaction }
    );
    await transaction.commit();
    res
      .status(201)
      .json({ message: "Director added successfully", data: director });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const addWriter = async (req, res, next) => {
  const { name } = req.body;
  const transaction = await sequelize.transaction();
  try {
    const writer = await WriterModel.create(
      {
        name,
      },
      { transaction }
    );
    await transaction.commit();
    res
      .status(201)
      .json({ message: "Writer added successfully", data: writer });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const addStar = async (req, res, next) => {
  const { name } = req.body;
  const transaction = await sequelize.transaction();
  try {
    const star = await StarModel.create(
      {
        name,
      },
      { transaction }
    );
    await transaction.commit();
    res.status(201).json({ message: "Star added successfully", data: star });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error", error: error.message });
  }
};

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

const getAllUser = async (req, res, next) => {
  let { keyword } = req.query;

  try {
    const query = {
      attributes: ["id", "name", "email"],
      order: ["name"],
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
    res.json({
      message: "Success",
      data: users.map((user) => {
        return { id: user.id, name: user.name };
      }),
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const getAllAdmin = async (req, res, next) => {
  let { keyword } = req.query;

  try {
    const query = {
      attributes: ["id", "name", "email"],
      order: ["name"],
    };
    if (keyword) {
      query.where = {
        email: {
          [Op.like]: `%${keyword}%`,
        },
      };
    }
    const admins = await AdminModel.findAll(query);
    res.json({
      message: "Success",
      data: admins.map((admin) => {
        return { id: admin.id, name: admin.name };
      }),
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const getAllWriter = async (req, res, next) => {
  let { keyword } = req.query;

  try {
    const query = {
      attributes: ["id", "name"],
      order: ["name"],
    };

    if (keyword) {
      query.where = {
        name: {
          [Op.like]: `%${keyword}%`,
        },
      };
    }
    const writers = await WriterModel.findAll(query);
    res.json({
      message: "Success",
      data: writers.map((writer) => {
        return { id: writer.id, name: writer.name };
      }),
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const getAllStar = async (req, res, next) => {
  let { keyword } = req.query;
  try {
    const query = {
      attributes: ["id", "name"],
      order: ["name"],
    };

    if (keyword) {
      query.where = {
        name: {
          [Op.like]: `%${keyword}%`,
        },
      };
    }
    const stars = await StarModel.findAll(query);
    res.json({
      message: "Success",
      data: stars.map((star) => {
        return { id: star.id, name: star.name };
      }),
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const getAllDirector = async (req, res, next) => {
  let { keyword } = req.query;
  try {
    const query = {
      attributes: ["id", "name"],
      order: ["name"],
    };

    if (keyword) {
      query.where = {
        name: {
          [Op.like]: `%${keyword}%`,
        },
      };
    }
    const directors = await DirectorModel.findAll(query);
    res.json({
      message: "Success",
      data: directors.map((director) => {
        return { id: director.id, name: director.name };
      }),
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

module.exports = {
  addMovie,
  addTrailer,
  addDirector,
  addWriter,
  addStar,
  addCategory,
  getAllUser,
  getAllAdmin,
  getAllWriter,
  getAllStar,
  getAllDirector,
};
