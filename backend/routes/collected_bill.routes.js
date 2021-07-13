module.exports = (app) => {
  const collected_bill = require("../controllers/collected_bill.controller.js");

  var router = require("express").Router();

  // Create a new Store
  router.post("/", collected_bill.create);

  // Retrieve all collected_bill
  router.get("/all/:id", collected_bill.findAll);

  // Retrieve all published collected_bill
  // router.get("/published", collected_bill.findAllPublished);

  // Retrieve a single Store with id
  router.get("/:id", collected_bill.findOne);

  // Update a Store with id
  router.put("/:id", collected_bill.update);

  // Delete a Store with id
  router.delete("/:id", collected_bill.delete);

  // Create a new Store
  router.delete("/", collected_bill.deleteAll);

  app.use("/collected-bill", router);
};
