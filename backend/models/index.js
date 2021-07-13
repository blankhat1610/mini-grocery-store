'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.store = require("./store.model.js")(sequelize, Sequelize);
db.store_phone = require("./store_phone.model.js")(sequelize, Sequelize);
db.store_address = require("./store_address.model.js")(sequelize, Sequelize);
db.store_photo = require("./store_photo.model.js")(sequelize, Sequelize);
db.store_category = require("./store_category.model.js")(sequelize, Sequelize);
db.store_product = require("./store_product.model.js")(sequelize, Sequelize);
db.employee = require("./employee.model.js")(sequelize, Sequelize);
db.customer = require("./customer.model.js")(sequelize, Sequelize);
db.bill = require("./bill.model.js")(sequelize, Sequelize);
db.bill_item = require("./bill_item.model.js")(sequelize, Sequelize);
db.visited_store = require("./visited_store.model.js")(sequelize, Sequelize);
db.collected_bill = require("./collected_bill.model.js")(sequelize, Sequelize);

module.exports = db;
