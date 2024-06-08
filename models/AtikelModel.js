const { Sequelize } = require("sequelize");
const db = require("../config/database.js");

const { DataTypes } = Sequelize;

const Artikel = db.define(
  "artikel",
  {
    title: {
      type: DataTypes.STRING,
    },
    kategori: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    pengertian: {
      type: DataTypes.STRING,
    },
    subbab1: {
      type: DataTypes.STRING,
    },
    subbab2: {
      type: DataTypes.STRING,
    },
    artikel1: {
      type: DataTypes.STRING,
    },
    artikel2: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Artikel;
