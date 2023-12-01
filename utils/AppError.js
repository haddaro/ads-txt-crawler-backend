// Our very own error that has both a message and a status code
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    //If the status code is 400 and something, it's a 'fail',
    //else it's an error:
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    //Helps us find the location of the error:
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
