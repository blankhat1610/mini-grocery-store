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
    //   "store_addresses",
    //   [
    //     {
    //       address: "87 Nguyen Dinh Hien",
    //       map_url: "https://goo.gl/maps/ohC6e2oSFQtHuTGQA",
    //       store_id: 1,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       address: "Huong Thuy, Hue",
    //       map_url: "https://goo.gl/maps/BiBxtdQDZFhmu7w37",
    //       store_id: 2,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       address: "Hung Lam, Hung Nguyen, Nghe An",
    //       map_url: "https://goo.gl/maps/4JkQcx33bsqr7xDD7",
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
    return queryInterface.bulkDelete("store_addresses", null, {});
  },
};
