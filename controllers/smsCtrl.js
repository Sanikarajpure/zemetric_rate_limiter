const { saveSmsRequest, getSmsStats } = require("../services/smsService");
const { ApiError } = require("../utils/apiError");

const sendSms = async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
      return next(new ApiError(400, "Phone number and message are required."));
    }

    // Get the IP address of the client making the request
    const ipAddress = req.ip;

    // Save the SMS request in the database
    await saveSmsRequest(ipAddress, phoneNumber);

    // Simulate SMS sending
    console.log(`Sending SMS to ${phoneNumber}: ${message}`);

    res.status(200).json({
      message: "SMS sent successfully!",
    });
  } catch (error) {
    console.error("Error sending SMS:", error);

    return new ApiError(500, "Failed to send SMS. Please try again later.");
  }
};

const getSmsStatistics = async (req, res, next) => {
  const { phoneNumber } = req.params;
  const ipAddress = req.ip;

  if (!phoneNumber || !ipAddress) {
    return next(new ApiError(400, "Phone number is required."));
  }

  try {
    const stats = await getSmsStats(phoneNumber, ipAddress);
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error(error);
    return new ApiError(500, "Internal server error while fetching stats.");
  }
};
module.exports = { sendSms, getSmsStatistics };
