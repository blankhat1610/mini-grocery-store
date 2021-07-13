"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.store);
      this.belongsTo(models.customer);
      this.hasOne(models.employee);
      this.hasMany(models.bill_item);
    }
  }
  bill.init(
    {
      area: DataTypes.STRING,
      table: DataTypes.INTEGER,
      total_price: DataTypes.DECIMAL,
      total_item: DataTypes.INTEGER,
      total_discount: DataTypes.DECIMAL,
      store_id: DataTypes.INTEGER,
      employee_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "bill",
    }
  );
  return bill;
};
