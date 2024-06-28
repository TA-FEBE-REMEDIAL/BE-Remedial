const { Sequelize } = require("sequelize");
const db = require("../config/database.js");
const Challenge = require("./ChallangeModel.js");

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
    nilai: {
      type: DataTypes.INTEGER,
    },
    feedback: {
      type: DataTypes.STRING,
    },
    // url: {
    //   type: DataTypes.STRING,
    // },
    challenge_id: {
      type: DataTypes.BIGINT,
    },
    email: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Karya.belongsTo(Challenge, {
  foreignKey: "challenge_id",
  as: "challenge",
});

module.exports = Karya;
