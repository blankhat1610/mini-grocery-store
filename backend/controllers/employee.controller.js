const db = require("../models");
const Employee = db.employee;
const Store = db.store;
const Op = db.Sequelize.Op;

const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
const { store } = require("../models");
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const employee = {
    name: req.body.name,
    username: req.body.username,
    // avatar: req.body.avatar,
    password: req.body.password,
    address: req.body.address,
    phone_number: req.body.phone_number,
    store_id: req.body.store_id,
  };

  // Save Tutorial in the database
  Employee.create(employee)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Employee.findAll({ where: { store_id: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.signin = (req, res) => {
  Employee.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((emp) => {
      if (!emp) {
        return res.status(404).send({ message: "Emp Not found." });
      }

      var passwordIsValid = req.body.password === emp.password;

      console.log(passwordIsValid);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: emp.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      Store.findOne({ where: { id: req.body.store_id } }).then((store) => {
        res.status(200).send({
          id: emp.id,
          name: emp.name,
          username: emp.username,
          address: emp.address,
          phoneNumber: emp.phone_number,
          storeId: req.body.store_id,
          storeName: store.name,
          role: "employee",
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Employee.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stores.",
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {};
