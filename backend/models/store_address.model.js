'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store_address extends Model {
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
  store_address.init({
    address: DataTypes.STRING,
    map_url: DataTypes.STRING,
    store_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'store_address',
  });
  return store_address;
};