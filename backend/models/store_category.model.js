"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class store_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.store);
      this.hasMany(models.store_product);
    }
  }
  store_category.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      store_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "store_category",
    }
  );
  return store_category;
};
