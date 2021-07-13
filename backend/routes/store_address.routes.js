module.exports = app => {
    const store_addresses = require("../controllers/store_address.controller.js");

    var router = require("express").Router();

    // Create a new Store
    router.post("/", store_addresses.create);

    // Retrieve all store_addresses
    router.get("/", store_addresses.findAll);

    // Retrieve all published store_addresses
    // router.get("/published", store_addresses.findAllPublished);

    // Retrieve a single Store with id
    router.get("/:id", store_addresses.findOne);

    // Update a Store with id
    router.put("/:id", store_addresses.update);

    // Delete a Store with id
    router.delete("/:id", store_addresses.delete);

    // Create a new Store
    router.delete("/", store_addresses.deleteAll);

    app.use('/store-address', router);
};