"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      movie.belongsToMany(models.user, {
        through: models.rate,
        foreignKey: "id_movie",
        as: "movieRate",
      });
      movie.hasMany(models.rate, {
        foreignKey: "id_movie",
        as: "rates",
      });
      movie.hasMany(models.watchlist, {
        foreignKey: "id_movie",
        as: "watchlists",
      });
      movie.belongsToMany(models.user, {
        through: models.watchlist,
        foreignKey: "id_movie",
        as: "movieWatchlist",
      });
      movie.hasMany(models.trailer, {
        foreignKey: "id_movie",
        as: "trailers",
      });
      movie.belongsTo(models.director, {
        foreignKey: "id_director",
        as: "director",
      });
      movie.belongsToMany(models.writer, {
        through: models.movie_writer,
        foreignKey: "id_movie",
        as: "writers",
      });
      movie.belongsToMany(models.star, {
        through: models.movie_star,
        foreignKey: "id_movie",
        as: "stars",
      });
      movie.belongsToMany(models.category, {
        through: models.movie_category,
        foreignKey: "id_movie",
        as: "categories",
      });
    }
  }
  movie.init(
    {
      name: DataTypes.STRING,
      overview: DataTypes.TEXT,
      url_poster: DataTypes.STRING,
      url_image: DataTypes.STRING,
      id_director: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "movie",
      underscored: true,
    }
  );
  return movie;
};
