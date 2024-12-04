const SmsRequest = require("../models/smsRequest");
const { Op } = require("sequelize");
const { ApiError } = require("../utils/apiError");
const { createViolation } = require("../services/rateLimit");

const RATE_LIMIT_PER_MINUTE = 3; // Max 3 requests per minute
const RATE_LIMIT_PER_DAY = 10; // Max 10 requests per day

const rateLimiter = () => {
  return async (req, res, next) => {
    const ipAddress = req.ip;
    const phoneNumber = req.body.phoneNumber;

    if (!phoneNumber) {
      return next(new ApiError(400, "Phone number is required."));
    }

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

      // Check if the rate limit is exceeded
      if (requestsLastMinute >= RATE_LIMIT_PER_MINUTE) {
        // Log rate limit violation
        await createViolation(phoneNumber, ipAddress);

        // Respond with rate limit error
        return res.status(429).json({
          message:
            "Too many requests. Please wait a minute before trying again.",
        });
      }

      if (requestsLastDay >= RATE_LIMIT_PER_DAY) {
        // Log rate limit violation
        await createViolation(phoneNumber, ipAddress);

        // Respond with daily limit error
        return res.status(429).json({
          message: "Daily limit reached. Please try again tomorrow.",
        });
      }

      // Proceed with the request if limits are not exceeded
      next();
    } catch (error) {
      console.error("Error in rate limiter:", error);
      return next(new ApiError(500, "Internal server error."));
    }
  };
};

module.exports = rateLimiter;
