module.exports = app => {
    const visited_store = require("../controllers/visited_store.controller.js");

    var router = require("express").Router();

    // Create a new Store
    router.post("/", visited_store.create);

    // Retrieve all visited_store
    router.get("/", visited_store.findAll);

    // Retrieve all published visited_store
    // router.get("/published", visited_store.findAllPublished);

    // Retrieve a single Store with id
    router.get("/:sid", visited_store.findOne);

    // Update a Store with id
    router.put("/:id", visited_store.update);

    // Delete a Store with id
    router.delete("/:id", visited_store.delete);

    // Create a new Store
    router.delete("/", visited_store.deleteAll);

    app.use('/visited-store', router);
};