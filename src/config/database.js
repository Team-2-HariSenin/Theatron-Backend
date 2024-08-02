const path = require("path");
import mysql2 from "mysql2";

require("dotenv").config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  development: {
    dialect: "mysql",
    dialectModule: mysql2,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  production: {
    dialect: "mysql",
    dialectModule: mysql2,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
};
