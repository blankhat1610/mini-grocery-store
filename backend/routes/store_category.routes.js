module.exports = (app) => {
  const store_categories = require("../controllers/store_category.controller.js");

  var router = require("express").Router();

  // Create a new Store
  router.post("/", store_categories.create);

  // Retrieve all store_categories
  router.get("/all/:id", store_categories.findAll);

  // Retrieve all published store_categories
  // router.get("/published", store_categories.findAllPublished);

  // Retrieve a single Store with id
  router.get("/:id", store_categories.findOne);

  // Update a Store with id
  router.put("/:id", store_categories.update);

  // Delete a Store with id
  router.delete("/:id", store_categories.delete);

  // Create a new Store
  router.delete("/", store_categories.deleteAll);

  app.use("/store-category", router);
};
