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
    return queryInterface.bulkInsert(
      "stores",
      [
        {
          owner_name: "Administrator",
          owner_phone_number: "0123456789",
          password: "admin",
          name: "Xuan Thuong",
          url: "https://github.com/BlankHat1610",
          email: "maixuanthuong1610@gmail.com",
          description: "Technology Company",
          created_at: new Date(),
          updated_at: new Date(),
        },
        // {
        //   owner_name: "LCN",
        //   owner_phone_number: "2",
        //   password: "123",
        //   name: "Com Nguyen",
        //   url: "https://github.com/LCN",
        //   email: "l@gmail.com",
        //   description: "Technology Company",
        //   created_at: new Date(),
        //   updated_at: new Date(),
        // },
        // {
        //   owner_name: "TCH",
        //   owner_phone_number: "3",
        //   password: "123",
        //   name: "Hoang Design",
        //   url: "https://github.com/TCH",
        //   email: "h@gmail.com",
        //   description: "Design Company",
        //   created_at: new Date(),
        //   updated_at: new Date(),
        // },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("stores", null, {});
  },
};
