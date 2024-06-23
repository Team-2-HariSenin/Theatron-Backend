"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      rate.belongsTo(models.user, {
        foreignKey: "id_user",
      });
      rate.belongsTo(models.movie, {
        foreignKey: "id_movie",
      });
    }
  }
  rate.init(
    {
      id_user: DataTypes.INTEGER,
      id_movie: DataTypes.INTEGER,
      rate: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "rate",
      underscored: true,
    }
  );
  return rate;
};
