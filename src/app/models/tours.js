'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tours.init({
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    description: DataTypes.TEXT,
    rating: DataTypes.DOUBLE,
    start: DataTypes.STRING,
    end: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tours',
  });
  return Tours;
};