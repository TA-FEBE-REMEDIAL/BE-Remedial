const { Sequelize } = require("sequelize");
const db = require("../config/database.js");

const { DataTypes } = Sequelize;

const Program = db.define(
  "program",
  {
    judul: {
      type: DataTypes.STRING,
    },
    kategori: {
      type: DataTypes.STRING,
    },
    desc_program: {
      type: DataTypes.STRING,
    },
    detail_program: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Program;
