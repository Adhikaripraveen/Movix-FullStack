class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;
  }
}
module.exports = CustomError;
