'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.store);
      this.belongsTo(models.bill);
    }
  };
  employee.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    store_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'employee',
  });
  return employee;
};