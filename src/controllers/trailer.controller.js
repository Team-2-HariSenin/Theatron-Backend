const { toSeconds, parse } = require("iso8601-duration");
const { sequelize } = require("../models");
const { movie: MovieModel, trailer: TrailerModel } = require("../models");
const axios = require("axios");

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

const updateTrailer = async (req, res, next) => {
  const { youtubeIds, id_movie } = req.body;

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

    return `${hours > 0 ? `${hours}.` : ""}${
      minutes < 10 && hours > 0 ? "0" : ""
    }${minutes}.${secs < 10 ? "0" : ""}${secs}`;
  };

  const transaction = await sequelize.transaction();

  try {
    // Fetch existing trailers
    const existingTrailers = await TrailerModel.findAll({
      where: { id_movie },
      transaction,
    });

    // Get the current trailer IDs
    const existingTrailerIds = existingTrailers.map((trailer) => trailer.key);

    // Determine trailers to add and trailers to remove
    const trailersToAdd = youtubeIds.filter(
      (id) => !existingTrailerIds.includes(id)
    );
    const trailersToRemove = existingTrailerIds.filter(
      (id) => !youtubeIds.includes(id)
    );

    // Add new trailers
    const newTrailers = await Promise.all(
      trailersToAdd.map(async (id) => {
        const youtubeData = await getUser(id);
        if (!youtubeData) {
          throw new Error(`Failed to fetch YouTube data for ID ${id}`);
        }

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
      })
    );

    // Remove trailers
    await TrailerModel.destroy({
      where: {
        id_movie,
        key: trailersToRemove,
      },
      transaction,
    });

    await transaction.commit();
    res.status(200).json({
      message: "Trailers updated successfully",
      newTrailers,
      removedTrailers: trailersToRemove,
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error", error: error.message });
  }
};

module.exports = {
  addTrailer,
  updateTrailer,
};
