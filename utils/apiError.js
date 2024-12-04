const httpStatus = require("http-status");

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

// Converts any error to ApiError if it's not already
const convertToApiError = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode ||
      (error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR);

    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message);
  }
  next(error);
};

// Centralized error handler
const handleError = (err, res) => {
  const { statusCode, message } = err;

  res.status(statusCode).send({
    status: "error",
    statusCode,
    message,
  });
};

module.exports = {
  ApiError,
  handleError,
  convertToApiError,
};
