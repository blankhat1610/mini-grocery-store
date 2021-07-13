module.exports = app => {
    const bill_items = require("../controllers/bill_item.controller.js");

    var router = require("express").Router();

    // Create a new Store
    router.post("/", bill_items.create);

    // Retrieve all bill_items
    router.get("/", bill_items.findAll);

    // Retrieve all published bill_items
    // router.get("/published", bill_items.findAllPublished);

    // Retrieve a single Store with id
    router.get("/:id", bill_items.findOne);

    // Update a Store with id
    router.put("/:id", bill_items.update);

    // Delete a Store with id
    router.delete("/:id", bill_items.delete);

    // Create a new Store
    router.delete("/", bill_items.deleteAll);

    app.use('/bill-item', router);
};