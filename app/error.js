const error = require("../utils/error");

const notFoundHandler = (_req, _res, next) => {
  error("not found", 404);
  next(error);
};

const errorHandler = (error, _req, res, _next) => {
  const errorStatus = error.status || 500;
  const message = error.message || "server error";

  res.status(errorStatus).json({
    message: message,
  });
};

module.exports = { notFoundHandler, errorHandler };
