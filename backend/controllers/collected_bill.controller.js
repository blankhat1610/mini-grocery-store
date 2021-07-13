const db = require("../models");
const CollectedBill = db.collected_bill;
const VisitedStore = db.visited_store;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.bill_json) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Visited_Store
  const collected_bill = {
    visited_store_id: req.body.visited_store_id,
    bill_json: req.body.bill_json,
  };

  // Save Tutorial in the database
  CollectedBill.create(collected_bill)
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
  let result = [];
  VisitedStore.findAll({ where: { customer_id: req.params.id } })
    .then(async (vs) => {
      for (const item of vs) {
        await CollectedBill.findAll({
          where: { visited_store_id: item.id },
        }).then(async (data) => {
          for (const cb of data) {
            result.push(cb);
          }
        });
      }
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Collected Bill.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {};
