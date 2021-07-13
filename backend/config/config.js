require("dotenv").config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "bill_collector",
    host: DB_HOST,
    dialect: "postgres",
    client_encoding: "UTF8",
    define: {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "bill_collector",
    host: DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "bill_collector",
    host: DB_HOST,
    dialect: "postgres",
  },
};
