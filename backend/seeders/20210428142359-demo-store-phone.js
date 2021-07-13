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
    //   "store_phones",
    //   [
    //     {
    //       number: "0948698057",
    //       store_id: 1,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       number: "0756899546",
    //       store_id: 2,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       number: "0848698123",
    //       store_id: 3,
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
    return queryInterface.bulkDelete("store_phones", null, {});
  },
};
