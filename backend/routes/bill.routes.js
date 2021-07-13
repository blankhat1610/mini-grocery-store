module.exports = (app) => {
  const bills = require("../controllers/bill.controller.js");

  var router = require("express").Router();

  // Create a new Store
  router.post("/", bills.create);

  // Retrieve all bills
  router.get("/all/:id", bills.findAll);

  // Retrieve all published bills
  // router.get("/published", bills.findAllPublished);

  // Retrieve a single Store with id
  router.get("/:id", bills.findOne);

  router.get("/app-find/:id", bills.appFind);

  // Update a Store with id
  router.put("/:id", bills.update);

  // Delete a Store with id
  router.delete("/:id", bills.delete);

  // Create a new Store
  router.delete("/", bills.deleteAll);

  app.use("/bill", router);
};
