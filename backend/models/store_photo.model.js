'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store_photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.store);
    }
  };
  store_photo.init({
    image: DataTypes.STRING,
    store_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'store_photo',
  });
  return store_photo;
};