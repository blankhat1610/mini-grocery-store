module.exports = (app) => {
  const employees = require("../controllers/employee.controller.js");

  var router = require("express").Router();

  // Create a new Store
  router.post("/", employees.create);

  // Retrieve all employees
  router.get("/all/:id", employees.findAll);

  router.post("/signin", employees.signin);

  // Retrieve a single Store with id
  router.get("/:id", employees.findOne);

  // Update a Store with id
  router.put("/:id", employees.update);

  // Delete a Store with id
  router.delete("/:id", employees.delete);

  // Create a new Store
  router.delete("/", employees.deleteAll);

  app.use("/employee", router);
};
