module.exports = app => {
    const store_phones = require("../controllers/store_phone.controller.js");

    var router = require("express").Router();

    // Create a new Store
    router.post("/", store_phones.create);

    // Retrieve all store_phones
    router.get("/", store_phones.findAll);

    // Retrieve all published store_phones
    // router.get("/published", store_phones.findAllPublished);

    // Retrieve a single Store with id
    router.get("/:id", store_phones.findOne);

    // Update a Store with id
    router.put("/:id", store_phones.update);

    // Delete a Store with id
    router.delete("/:id", store_phones.delete);

    // Create a new Store
    router.delete("/", store_phones.deleteAll);

    app.use('/store-phone', router);
};