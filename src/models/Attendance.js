const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Attendance = sequelize.define(
  "Attendance",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: DataTypes.DATEONLY,
    check_in_time: DataTypes.TIME,
  },
  {
    indexes: [{ unique: true, fields: ["UserId", "date"] }],
  }
);

module.exports = Attendance;
