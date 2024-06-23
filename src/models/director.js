"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class director extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      director.hasMany(models.movie, {
        foreignKey: "id_director",
        as: "movieDirector",
      });
    }
  }
  director.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "director",
      underscored: true,
    }
  );
  return director;
};
