'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Categories, {foreignKey: 'category_code'})
    }
  }
  Book.init({
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    image: DataTypes.STRING,
    category_code: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};