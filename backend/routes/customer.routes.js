const verifySignUp = require("../middleware/verifySignUp.js");

module.exports = app => {
    const customers = require("../controllers/customer.controller.js");

    var router = require("express").Router();

    // Create a new Store
    router.post("/signup",
        [
            verifySignUp.checkDuplicateCustomer,
        ],
        customers.signup);

    // Retrieve all customers
    router.get("/", customers.findAll);

    // Signin with phone number and password
    router.post("/signin", customers.signin);

    // Retrieve a single Store with id
    router.get("/:id", customers.findOne);

    // Update a Store with id
    router.put("/:id", customers.update);

    // Delete a Store with id
    router.delete("/:id", customers.delete);

    // Create a new Store
    router.delete("/", customers.deleteAll);

    app.use('/customer', router);
};