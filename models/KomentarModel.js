const { Sequelize } = require("sequelize");
const db = require("../config/database.js");

const { DataTypes } = Sequelize;

const Komentar = db.define(
  "komentar",
  {
    nama: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    komentar: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    artikel_id: {
      type: DataTypes.BIGINT,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Komentar;
