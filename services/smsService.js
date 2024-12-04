const SmsRequest = require("../models/smsRequest");
const { Op } = require("sequelize");

const saveSmsRequest = async (ipAddress, phoneNumber) => {
  try {
    // Create a new SMS request record
    const smsRequest = await SmsRequest.create({
      ipAddress,
      phoneNumber,
    });
    return smsRequest;
  } catch (error) {
    console.error("Error saving SMS request:", error);
    throw new Error("Failed to save SMS request");
  }
};

const getSmsStats = async (phoneNumber, ipAddress) => {
  const now = new Date();
  const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  try {
    // Count requests in the last minute for the same phone number + IP
    const requestsLastMinute = await SmsRequest.count({
      where: {
        ipAddress,
        phoneNumber,
        requestTime: { [Op.gt]: oneMinuteAgo },
      },
    });

    // Count requests in the last day for the same phone number + IP
    const requestsLastDay = await SmsRequest.count({
      where: {
        ipAddress,
        phoneNumber,
        requestTime: { [Op.gt]: oneDayAgo },
      },
    });

    return {
      requestsLastMinute,
      requestsLastDay,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching SMS stats.");
  }
};

module.exports = { saveSmsRequest, getSmsStats };
