'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collected_bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  collected_bill.init({
    visited_store_id: DataTypes.INTEGER,
    bill_json: DataTypes.TEXT('long')
  }, {
    sequelize,
    modelName: 'collected_bill',
  });
  return collected_bill;
};