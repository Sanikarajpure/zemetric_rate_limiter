const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class SmsRequest extends Model {}

SmsRequest.init(
  {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requestTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "SmsRequest",
    indexes: [
      {
        unique: true,
        fields: ["phoneNumber", "ipAddress", "requestTime"], // Composite index on phoneNumber + ipAddress + requestTime
      },
    ],
  }
);

module.exports = SmsRequest;
