const { getViolationsInLastHour } = require("../services/rateLimit");
const { ApiError } = require("../utils/apiError");

const getRateLimitViolations = async (req, res, next) => {
  const { phoneNumber } = req.params;

  // Check if phone number is provided
  if (!phoneNumber) {
    return next(new ApiError(400, "Phone number is required."));
  }

  // Basic phone number validation (example for 10-digit numbers)
  const phoneNumberRegex = /^[0-9]{10}$/;
  if (!phoneNumberRegex.test(phoneNumber)) {
    return next(new ApiError(400, "Invalid phone number format."));
  }

  try {
    const violations = await getViolationsInLastHour(phoneNumber);
    res.status(200).json({
      success: true,
      data: violations,
    });
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(500, "Internal server error while fetching stats.")
    );
  }
};

module.exports = { getRateLimitViolations };
