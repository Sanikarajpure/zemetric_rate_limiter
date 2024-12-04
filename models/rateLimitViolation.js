const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const RateLimitViolation = sequelize.define(
  "RateLimitViolation",
  {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    createdAt: "timestamp", 
    updatedAt: false,
  }
);

module.exports = RateLimitViolation;
