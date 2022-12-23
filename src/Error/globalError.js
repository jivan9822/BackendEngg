const AppError = require('./AppError');

exports.globalErrorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') err = validationErrHandler(err);
  if (err.code === 11000) err = duplicateErrHandler(err);
  res.status(err.statusCode || 500).json({
    status: false,
    message: err.message,
    err,
  });
};

// MONGOOSE VALIDATION ERROR HANDLER
const validationErrHandler = (error) => new AppError(`${error.message}`, 400);

// MONGOOSE DUPLICATE ERROR HANDLER
const duplicateErrHandler = (err) => {
  const msg = err.message.match(/{.*?}/);
  return new AppError(`Duplicate not allowed! ${msg[0]}`, 409);
};
