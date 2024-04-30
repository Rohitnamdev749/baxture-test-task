class CustomError extends Error {
  constructor(errorMessage, statusCode) {
    super(errorMessage);
    this.statusCode = statusCode;
    this.success = false;
    // this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error"
    // this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
    // Object.setPrototypeOf(this, CustomError.prototype)
  }
}
module.exports = CustomError;
