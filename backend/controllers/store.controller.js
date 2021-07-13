const db = require("../models");
const Store = db.store;
const Op = db.Sequelize.Op;
const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Create and Save a new Store
exports.signup = (req, res) => {
  // Validate request
  if (!req.body.owner_name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Store
  const store = {
    owner_name: req.body.owner_name,
    owner_phone_number: req.body.owner_phone_number,
    password: bcrypt.hashSync(req.body.password, 8),
    name: req.body.name,
    email: req.body.email,
    url: req.body.url,
    description: req.body.description,
  };
  console.log(store);

  // Save Store in the database
  Store.create(store)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Store.",
      });
    });
};

// Retrieve all Stores from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Store.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stores.",
      });
    });
};

// Find a single Store with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Store.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stores.",
      });
    });
};

// Login
exports.signin = (req, res) => {
  Store.findOne({
    where: {
      owner_phone_number: req.body.owner_phone_number,
    },
  })
    .then((store) => {
      if (!store) {
        return res.status(404).send({ message: "Store Not found." });
      }
      console.log(!req.body.owner_name);
      console.log(req.body.password, store.password);

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        store.password
      );

      console.log(passwordIsValid);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: store.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: store.id,
        phoneNumber: store.owner_phone_number,
        name: store.owner_name,
        storeName: store.name,
        url: store.url,
        email: store.email,
        description: store.description,
        role: "owner",
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Update a Store by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Store.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

// Delete a Store with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Store.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};

// Delete all Stores from the database.
exports.deleteAll = (req, res) => {
  Store.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};
