"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movie_writer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      movie_writer.belongsTo(models.movie, {
        foreignKey: "id_movie",
      });
      movie_writer.belongsTo(models.writer, {
        foreignKey: "id_writer",
      });
    }
  }
  movie_writer.init(
    {
      id_movie: DataTypes.INTEGER,
      id_writer: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "movie_writer",
      underscored: true,
    }
  );
  return movie_writer;
};
