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
      "employees",
      [
        {
          name: "Administrator",
          username: "admin",
          password: "admin",
          avatar: "",
          address: "Where the owner live",
          phone_number: "0944513107",
          store_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        // {
        //   name: "Le Thi Thanh Ha",
        //   username: "ha",
        //   password: "ha",
        //   avatar: "thanh_ha.jpg",
        //   address: "Huyen Unknown, Gia Lai",
        //   phone_number: "0784513256",
        //   store_id: 2,
        //   created_at: new Date(),
        //   updated_at: new Date(),
        // },
        // {
        //   name: "Ngo Thi Lanh",
        //   username: "lanh",
        //   password: "lanh",
        //   avatar: "thi_lanh.jpg",
        //   address: "Unknown place, DakLak",
        //   phone_number: "0789456123",
        //   store_id: 3,
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
    return queryInterface.bulkDelete("employees", null, {});
  },
};
