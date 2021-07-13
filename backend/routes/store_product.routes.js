module.exports = (app) => {
  const store_products = require("../controllers/store_product.controller.js");

  var router = require("express").Router();

  // Create a new Store
  router.post("/", store_products.create);

  // Retrieve all store_products
  router.get("/all/:id", store_products.findAll);

  // Retrieve all published store_products
  // router.get("/published", store_products.findAllPublished);

  // Retrieve a single Store with id
  router.get("/:id", store_products.findOne);

  // Update a Store with id
  router.put("/:id", store_products.update);

  // Delete a Store with id
  router.delete("/:id", store_products.delete);

  // Create a new Store
  router.delete("/", store_products.deleteAll);

  app.use("/store-product", router);
};
