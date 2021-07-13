const db = require("../models");
const Store = db.store;
const Customer = db.customer;

checkDuplicateStore = (req, res, next) => {
    // Phone
    Store.findOne({
        where: {
            owner_phone_number: req.body.owner_phone_number
        }
    }).then(store => {
        if (store) {
            res.status(400).send({
                message: "Failed! Phone number is already in use!"
            });
            return;
        }
        // Email
        Store.findOne({
            where: {
                email: req.body.email
            }
        }).then(store => {
            if (store) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }

            next();
        });
    });
};

checkDuplicateCustomer = (req, res, next) => {
    // Phone
    Customer.findOne({
        where: {
            phone_number: req.body.phone_number
        }
    }).then(customer => {
        if (customer) {
            res.status(400).send({
                message: "Failed! Phone number is already in use!"
            });
            return;
        }
        next();
    });
};

const verifySignUp = {
    checkDuplicateStore: checkDuplicateStore,
    checkDuplicateCustomer: checkDuplicateCustomer
};

module.exports = verifySignUp;