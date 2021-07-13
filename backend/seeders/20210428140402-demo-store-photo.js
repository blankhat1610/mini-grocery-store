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
    //   "store_photos",
    //   [
    //     {
    //       image: "cat.png",
    //       store_id: 1,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       image: "dog.png",
    //       store_id: 2,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       image: "cow.jpg",
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
    return queryInterface.bulkDelete("store_photos", null, {});
  },
};
