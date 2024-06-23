'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trailer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  trailer.init({
    id_movie: DataTypes.INTEGER,
    title: DataTypes.STRING,
    duration: DataTypes.STRING,
    key: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'trailer',
    underscored: true,
  });
  return trailer;
};