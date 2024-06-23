"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movie_star extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      movie_star.belongsTo(models.movie, {
        foreignKey: "id_movie",
      });
      movie_star.belongsTo(models.star, {
        foreignKey: "id_star",
      });
    }
  }
  movie_star.init(
    {
      id_movie: DataTypes.INTEGER,
      id_star: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "movie_star",
      underscored: true,
    }
  );
  return movie_star;
};
