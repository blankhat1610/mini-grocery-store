const db = require("../models");
const Bill = db.bill;
const BillItem = db.bill_item;
const Store = db.store;
const StoreProduct = db.store_product;
const Employee = db.employee;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.total_price) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const bill = {
    area: req.body.area,
    table: req.body.table,
    total_price: req.body.total_price,
    total_item: req.body.total_item,
    total_discount: req.body.total_discount,
    store_id: req.body.store_id,
    employee_id: req.body.employee_id,
  };

  // Save Tutorial in the database
  Bill.create(bill)
    .then((data) => {
      res.send(data);
      console.log("Bill " + data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Bills.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const result = [];
  Bill.findAll({ where: { store_id: req.params.id } })
    .then(async (data) => {
      for (const item of data) {
        await Employee.findByPk(item.employee_id).then((emp) => {
          let bill = {};
          bill.id = item.id;
          bill.total_item = item.total_item;
          bill.total_price = item.total_price;
          bill.employeeName = emp.name;
          bill.created_at = item.created_at;
          bill.updated_at = item.updated_at;
          result.push(bill);
        });
      }
      console.log("=============" + result);
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.appFind = (req, res) => {
  let storeName = null;
  const billDetail = [];

  Bill.findOne({ where: { id: req.params.id } })
    .then(async (bill) => {
      await Store.findOne({ where: { id: bill.store_id } }).then((store) => {
        return (storeName = store.name);
      });
      console.log("storeName ---------------- " + storeName);
      await BillItem.findAll({ where: { bill_id: bill.id } }).then(
        async (billItem) => {
          for (const item of billItem) {
            await StoreProduct.findByPk(item.product_id).then((product) => {
              let productItem = {};
              productItem.id = item.id;
              productItem.name = product.name;
              productItem.price = product.price;
              productItem.amount = item.amount;
              productItem.total = item.total_price;
              billDetail.push(productItem);
            });

            // billDetail.push({
            //   id: item.id,
            //   name: storeProduct.name,
            //   price: storeProduct.price,
            //   amount: item.amount,
            //   total: item.total_price,
            // });
          }
        }
      );
      res.send({
        storeId: bill.store_id,
        storeName: storeName,
        billDetail: billDetail,
        total: bill.total_price,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
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
