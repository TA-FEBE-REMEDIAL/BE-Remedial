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
    isi_artikel: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Artikel;
