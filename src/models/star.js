"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class star extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      star.belongsToMany(models.movie, {
        through: models.movie_star,
        foreignKey: "id_star",
        as: "starMovies",
      });
    }
  }
  star.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "star",
      underscored: true,
    }
  );
  return star;
};
