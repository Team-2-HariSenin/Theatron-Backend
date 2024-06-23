"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class writer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      writer.belongsToMany(models.movie, {
        through: models.movie_writer,
        foreignKey: "id_writer",
        as: "writerMovies",
      });
    }
  }
  writer.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "writer",
      underscored: true,
    }
  );
  return writer;
};
