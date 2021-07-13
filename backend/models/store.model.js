'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.store_address);
      this.hasMany(models.store_phone);
      this.hasMany(models.store_photo);
      this.hasMany(models.employee);
      this.hasMany(models.store_category);
      this.hasMany(models.bill);
    }
  };
  store.init({
    owner_name: DataTypes.STRING,
    owner_phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'store',
  });
  return store;
};