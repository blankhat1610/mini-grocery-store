module.exports = app => {
    const stores = require("../controllers/store.controller.js");
    const { verifySignUp } = require("../middleware");
    var router = require("express").Router();

    // Create a new Store
    router.post(
        "/signup",
        [
            verifySignUp.checkDuplicateStore,
        ],
        stores.signup
    );

    // Retrieve all stores
    router.get("/", stores.findAll);

    // Signin with phone number and password
    router.post("/signin", stores.signin);

    // Retrieve a single Store with id
    router.get("/:id", stores.findOne);

    // Update a Store with id
    router.put("/:id", stores.update);

    // Delete a Store with id
    router.delete("/:id", stores.delete);

    // Create a new Store
    router.delete("/", stores.deleteAll);

    app.use('/store', router);
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
};