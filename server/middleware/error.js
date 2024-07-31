const ErrorHandler = require('../utils/errorHandler');

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Handle MongoDB duplicate key error
  if (err.code && err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = 'Json Web Token is invalid, try again';
    err = new ErrorHandler(message, 400);
  }

// JWT Expire Error
  if (err.name === "TokenExpiredError") {
    const message = 'Json Web Token is expired, try again';
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "AxiosError") {
    const message = 'Network Connection Disconnected';
    err = new ErrorHandler(message, 500);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};

module.exports = errorMiddleware;