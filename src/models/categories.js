'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Định nghĩa quan hệ với model Book
     Categories.hasMany(models.Book, { foreignKey: 'category_code'});
    }
  }

  Categories.init({
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('value', value.charAt(0).toUpperCase() + value.slice(1));
      }
    }
  }, {
    sequelize,
    modelName: 'Categories',
  });

  return Categories;
};
