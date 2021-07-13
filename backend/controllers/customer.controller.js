const db = require("../models");
const Customer = db.customer;
const Op = db.Sequelize.Op;
const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Create and Save a new Tutorial
exports.signup = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const customer = {
        name: req.body.name,
        avatar: req.body.avatar,
        address: req.body.address,
        phone_number: req.body.phone_number,
        password: bcrypt.hashSync(req.body.password, 8),
    };

    // Save Tutorial in the database
    Customer.create(customer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.signin = (req, res) => {
    Customer.findOne({
        where: {
            phone_number: req.body.phone_number
        }
    })
        .then(customer => {
            if (!customer) {
                return res.status(404).send({ message: "Customer Not found." });
            }
            console.log(!req.body.name);
            console.log(req.body.password, customer.password)


            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                customer.password
            );

            console.log(passwordIsValid)

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }


            var token = jwt.sign({ id: customer.id, name: customer.name }, config.secret,);

            res.status(200).send({
                id: customer.id,
                name: customer.name,
                avatar: customer.avatar,
                address: customer.address,
                phone_number: customer.phone_number,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    Customer.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};