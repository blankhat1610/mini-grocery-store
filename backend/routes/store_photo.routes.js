module.exports = app => {
    const store_photos = require("../controllers/store_photo.controller.js");

    var router = require("express").Router();

    // Create a new store_photo
    router.post("/", store_photos.create);

    // Retrieve all store_photos
    router.get("/", store_photos.findAll);

    // Retrieve all published store_photos
    // router.get("/published", store_photos.findAllPublished);

    // Retrieve a single Store with id
    router.get("/:id", store_photos.findOne);

    // Update a Store with id
    router.put("/:id", store_photos.update);

    // Delete a Store with id
    router.delete("/:id", store_photos.delete);

    // Create a new Store
    router.delete("/", store_photos.deleteAll);

    app.use('/store-photo', router);
};