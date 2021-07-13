const db = require("../models");
const VisitedStore = db.visited_store;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.customer_id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Visited_Store
  const visited_store = {
    store_id: req.body.store_id,
    customer_id: req.body.customer_id,
  };

  VisitedStore.findAll({ where: { customer_id: req.body.customer_id } }).then(
    async (vs) => {
      for (const item of vs) {
        if (item.store_id === req.body.store_id) {
          res.send(item);
          return;
        }
      }

      // Save Tutorial in the database
      VisitedStore.create(visited_store)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial.",
          });
        });
    }
  );
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  // const store_id = req.query.store_id;
  // var condition = store_id ? { store_id: { [Op.iLike]: `%${store_id}%` } } : null;

  VisitedStore.findAll()
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

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  VisitedStore.findOne({ where: { store_id: req.params.sid } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving VisitedStore with id=" + id,
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
