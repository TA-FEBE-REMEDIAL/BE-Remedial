const { Sequelize } = require("sequelize");
const db = require("../config/database.js");

const { DataTypes } = Sequelize;

const ProgramUser = db.define(
  "user_program",
  {
    users_id: {
      type: DataTypes.BIGINT,
    },
    program_id: {
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

module.exports = ProgramUser;
