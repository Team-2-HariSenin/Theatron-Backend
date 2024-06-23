"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movie_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      movie_category.belongsTo(models.movie, {
        foreignKey: "id_movie",
      });
      movie_category.belongsTo(models.category, {
        foreignKey: "id_category",
      });
    }
  }
  movie_category.init(
    {
      id_movie: DataTypes.INTEGER,
      id_category: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "movie_category",
      underscored: true,
    }
  );
  return movie_category;
};
