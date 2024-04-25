class ApiError extends Error {
  statusCode;
  message;
  errors;
  constructor(statusCode, message, errors = null) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}
module.exports = ApiError;
