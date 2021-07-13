const db = require("../models");
const StorePhoto = db.store_photo;
const Op = db.Sequelize.Op;

// Create and Save a new StorePhoto
exports.create = (req, res) => {
    // Validate request
    if (!req.body.image) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a StorePhoto
    const store_photo = {
        image: req.body.image,
        store_id: req.body.store_id,
    };

    // Save StorePhoto in the database
    StorePhoto.create(store_photo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the StorePhoto."
            });
        });
};

// Retrieve all StorePhotos from the database.
exports.findAll = (req, res) => {
    const image = req.query.image;
    var condition = image ? { image: { [Op.iLike]: `%${image}%` } } : null;

    StorePhoto.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving StorePhotos."
            });
        });
};

// Find a single StorePhoto with an id
exports.findOne = (req, res) => {

};

// Update a StorePhoto by the id in the request
exports.update = (req, res) => {

};

// Delete a StorePhoto with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all StorePhotos from the database.
exports.deleteAll = (req, res) => {

};

// Find all published StorePhotos
exports.findAllPublished = (req, res) => {

};