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
      "customers",
      [
        {
          name: "Khach le",
          address: "Not have",
          phone_number: "0944513107",
          avatar: "",
          created_at: new Date(),
          updated_at: new Date(),
        },
        // {
        //   name: "Tran Chanh Hoang",
        //   address: "Hung Nguyen, Nghe An",
        //   phone_number: "0817883593",
        //   avatar: "",
        //   created_at: new Date(),
        //   updated_at: new Date(),
        // },
        // {
        //   name: "Le Cao Nguyen",
        //   address: "Loc Thuy, Hue",
        //   phone_number: "0345330900",
        //   avatar: "",
        //   created_at: new Date(),
        //   updated_at: new Date(),
        // },
        // {
        //   name: "Pham Thi Khanh Huyen",
        //   address: "Thach ",
        //   phone_number: "0989594956",
        //   avatar: "",
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
    return queryInterface.bulkDelete("customers", null, {});
  },
};
