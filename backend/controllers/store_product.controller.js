const db = require("../models");
const StoreProduct = db.store_product;
const StoreCategory = db.store_category;
const Op = db.Sequelize.Op;

// Create and Save a new Store_Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Store_Product
  const store_product = {
    name: req.body.name,
    category_id: req.body.category_id,
    price: req.body.price,
    amount: req.body.amount,
    description: req.body.description,
    mfg_date: req.body.mfg_date,
    exp_date: req.body.exp_date,
  };

  // Save Store_Product in the database
  StoreProduct.create(store_product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Store_Product.",
      });
    });
};

// Retrieve all Store_Products from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  const category = [];

  console.log("------------find all product---------------");
  StoreCategory.findAll({ where: { store_id: req.params.id } })
    .then((category_data) => {
      // res.send(category_data);
      category_data.map((item) => {
        category.push(item.id);
      });
      console.log(category);
      if (category.length === 0) {
        return res.send(category);
      }
      StoreProduct.findAll({
        where: {
          category_id: {
            [Op.or]: category,
          },
        },
      })
        .then((product_data) => {
          res.send(product_data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while retrieving Store_Products.",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Store_Products.",
      });
    });
};

// Find a single Store_Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  StoreProduct.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};

// Update a Store_Product by the id in the request
exports.update = (req, res) => {};

// Delete a Store_Product with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Store_Products from the database.
exports.deleteAll = (req, res) => {};

// Find all published Store_Products
exports.findAllPublished = (req, res) => {};
