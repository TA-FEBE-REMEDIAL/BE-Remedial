const { Sequelize } = require("sequelize");
const db = require("../config/database.js");

const { DataTypes } = Sequelize;

const Karya = db.define(
  "karya",
  {
    kategori: {
      type: DataTypes.STRING,
    },
    judul: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    tanggal_penerbit: {
      type: DataTypes.DATE,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    deskripsi: {
      type: DataTypes.STRING,
    },
    createdAt: false,
    updatedAt: false,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Karya;
