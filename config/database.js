const { Sequelize } = require("sequelize");

const pwDB = "Chika12345";

const db = new Sequelize("auth_db", "chika", pwDB, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
