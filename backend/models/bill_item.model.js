'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bill_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.store_product);
      this.belongsTo(models.bill);
    }
  };
  bill_item.init({
    item_discount: DataTypes.DECIMAL,
    max_discount_amount: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL,
    bill_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'bill_item',
  });
  return bill_item;
};