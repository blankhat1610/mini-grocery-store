"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("bills", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      area: {
        type: Sequelize.STRING,
      },
      table: {
        type: Sequelize.INTEGER,
      },
      total_price: {
        type: Sequelize.DECIMAL,
      },
      total_item: {
        type: Sequelize.INTEGER,
      },
      total_discount: {
        type: Sequelize.DECIMAL,
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          // Bill has one Store (belongsTo) 1:1
          model: "stores",
          key: "id",
        },
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          // Bill has one Employee (belongsTo) 1:1
          model: "employees",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("bills");
  },
};
