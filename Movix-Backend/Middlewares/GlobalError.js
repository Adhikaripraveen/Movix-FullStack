// middlewares/globalErrorHandler.js
const globalErrorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (res.headersSent) {
    return next(err); // Pass the error to the default Express handler if headers are already sent
}

  // Default values for unknown errors
  if (!statusCode) statusCode = 500;
  if (!message) message = "Internal Server Error";

  // Handle Mongoose Validation Errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((el) => el.message)
      .join(", "); // Combine all validation messages
  }

  // Handle Mongoose Cast Errors (e.g., invalid MongoDB ID)

  // Handle Duplicate Key Errors (e.g., unique field constraints)
  if (err.code && err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue);
    message = `This ${field} already in use . Please use a different ${field }.`;
  }
  if (err.name === "JsonWebTokenError") {
    statusCode = 400;
    message = "Please Login your Account"
  }
  if (err.name === "TokenExpiredError") {
    statusCode = 400;
    message = "Please Login Again";
  }
 
  
  // Send the error response
  res.status(statusCode).json({
    status: `${statusCode}`.startsWith("4") ? false : "error",
    message,
  });
};

module.exports = globalErrorHandler;
