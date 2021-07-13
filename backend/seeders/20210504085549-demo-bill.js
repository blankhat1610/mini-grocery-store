"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return;
    // return queryInterface.bulkInsert(
    //   "bills",
    //   [
    //     {
    //       area: "A",
    //       table: 1,
    //       total_price: 120.5,
    //       total_item: 4,
    //       total_discount: 0,
    //       store_id: 1,
    //       employee_id: 1,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       area: "A",
    //       table: 2,
    //       total_price: 220.5,
    //       total_item: 5,
    //       total_discount: 0,
    //       store_id: 1,
    //       employee_id: 2,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       area: "B",
    //       table: 1,
    //       total_price: 140,
    //       total_item: 3,
    //       total_discount: 0,
    //       store_id: 1,
    //       employee_id: 3,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       area: "B",
    //       table: 2,
    //       total_price: 452,
    //       total_item: 8,
    //       total_discount: 0,
    //       store_id: 1,
    //       employee_id: 3,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       area: "C",
    //       table: 1,
    //       total_price: 430,
    //       total_item: 7,
    //       total_discount: 0,
    //       store_id: 2,
    //       employee_id: 3,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       area: "C",
    //       table: 2,
    //       total_price: 780,
    //       total_item: 15,
    //       total_discount: 0,
    //       store_id: 2,
    //       employee_id: 1,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       area: "D",
    //       table: 1,
    //       total_price: 345,
    //       total_item: 9,
    //       total_discount: 0,
    //       store_id: 2,
    //       employee_id: 2,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       area: "D",
    //       table: 2,
    //       total_price: 798,
    //       total_item: 18,
    //       total_discount: 0,
    //       store_id: 2,
    //       employee_id: 2,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       area: "E",
    //       table: 1,
    //       total_price: 148,
    //       total_item: 6,
    //       total_discount: 0,
    //       store_id: 3,
    //       employee_id: 2,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       area: "E",
    //       table: 1,
    //       total_price: 148,
    //       total_item: 6,
    //       total_discount: 0,
    //       store_id: 3,
    //       employee_id: 2,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       area: "F",
    //       table: 1,
    //       total_price: 248,
    //       total_item: 7,
    //       total_discount: 0,
    //       store_id: 3,
    //       employee_id: 1,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       area: "F",
    //       table: 1,
    //       total_price: 347,
    //       total_item: 8,
    //       total_discount: 0,
    //       store_id: 3,
    //       employee_id: 3,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //   ],
    //   {}
    // );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("bills", null, {});
  },
};
