require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

const db = require("./models");
db.sequelize.sync();

// In development, you may need to drop existing tables and re-sync database.
// Just use force: true as following code:
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to blankhat application." });
});

require("./routes/store.routes")(app);
require("./routes/store_address.routes")(app);
require("./routes/store_category.routes")(app);
require("./routes/store_phone.routes")(app);
require("./routes/store_photo.routes")(app);
require("./routes/store_product.routes")(app);
require("./routes/employee.routes")(app);
require("./routes/customer.routes")(app);
require("./routes/bill.routes")(app);
require("./routes/bill_item.routes")(app);
require("./routes/visited_store.routes")(app);
require("./routes/collected_bill.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});