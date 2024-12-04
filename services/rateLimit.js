const RateLimitViolation = require("../models/rateLimitViolation");
const { Op } = require("sequelize");
const { ApiError } = require("../utils/apiError");

// Save a rate limit violation
const createViolation = async (phoneNumber, ipAddress) => {
  if (!phoneNumber || !ipAddress) {
    throw new Error("Phone number and IP address are required");
  }

  await RateLimitViolation.create({ phoneNumber, ipAddress });
};

// Get rate limit violations for a phone number in the last hour
const getViolationsInLastHour = async (phoneNumber) => {
  console.log("here---", phoneNumber);

  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000); // 1 hour ago

  try {
    const violations = await RateLimitViolation.count({
      where: {
        phoneNumber,
        timestamp: { [Op.gt]: oneHourAgo },
      },
    });

    // If no violations were found, return a default message or value
    if (violations === 0) {
      console.log(
        "No violations found for the given phone number in the last hour."
      );
      return {
        message:
          "No violations found for the given phone number in the last hour.",
        violations: 0,
      };
    }

    return { violations };
  } catch (error) {
    console.error("Error retrieving violations:", error);
    throw new Error("An error occurred while fetching the violations.");
  }
};

module.exports = { createViolation, getViolationsInLastHour };
