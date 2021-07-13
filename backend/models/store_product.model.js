"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class store_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.store_category);
    }
  }
  store_product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      amount: DataTypes.INTEGER,
      description: DataTypes.STRING,
      mfg_date: DataTypes.DATE,
      exp_date: DataTypes.DATE,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "store_product",
    }
  );
  return store_product;
};
