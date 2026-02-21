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

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    check_in_time: {
      type: DataTypes.DATE,  
      allowNull: false,
    },

    check_out_time: {
      type: DataTypes.DATE,
      allowNull: true,  
    },
  },
  {
    timestamps: true,  
    indexes: [
      {
        unique: true,
        fields: ["UserId", "date"], 
      },
    ],
  }
);

module.exports = Attendance;