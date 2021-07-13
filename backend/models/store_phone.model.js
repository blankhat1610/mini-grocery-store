'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store_phone extends Model {
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
  store_phone.init({
    number: DataTypes.STRING,
    store_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'store_phone',
  });
  return store_phone;
};