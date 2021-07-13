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
    //   "store_categories",
    //   [
    //     {
    //       name: "Milk Tea",
    //       description: "Tra Sua",
    //       store_id: 2,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       name: "Coffee",
    //       description: "Ca Phe",
    //       store_id: 2,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       name: "Com Suon",
    //       description: "Com co Suon",
    //       store_id: 2,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       name: "Agency",
    //       description: "Nhan dien thuong hieu",
    //       store_id: 3,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       name: "Art 2D",
    //       description: "Ve ky thuat 2D",
    //       store_id: 3,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       name: "Art 3D",
    //       description: "Ve ky thuat 3D",
    //       store_id: 3,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       name: "POD",
    //       description: "Print on demand",
    //       store_id: 3,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       name: "PHP",
    //       description: "PHP dev",
    //       store_id: 1,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       name: "iOS",
    //       description: "iOS dev",
    //       store_id: 1,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       name: "Android",
    //       description: "Android dev",
    //       store_id: 1,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       name: "Nodejs",
    //       description: "Nodejs dev",
    //       store_id: 1,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       name: "FE",
    //       description: "Front End dev",
    //       store_id: 1,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       name: "BE",
    //       description: "Back End dev",
    //       store_id: 1,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //     {
    //       name: "Br",
    //       description: "Bridge Engineer dev",
    //       store_id: 1,
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
    return queryInterface.bulkDelete("store_categories", null, {});
  },
};
