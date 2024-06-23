"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class watchlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      watchlist.belongsTo(models.user, {
        foreignKey: "id_user",
      });
      watchlist.belongsTo(models.movie, {
        foreignKey: "id_movie",
      });
    }
  }
  watchlist.init(
    {
      id_user: DataTypes.INTEGER,
      id_movie: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "watchlist",
      underscored: true,
    }
  );
  return watchlist;
};
