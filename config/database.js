const { Sequelize } = require("sequelize");

const pwDB = "Rekures_Sedap21";

const db = new Sequelize("auth_db", "root", pwDB, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
