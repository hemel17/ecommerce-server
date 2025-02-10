const express = require("express");
const middleware = require("./middleware");
const router = require("./routes");
const { notFoundHandler, errorHandler } = require("./error");
const app = express();

// * middlewares
app.use(middleware);

// * routes
app.use(router);

// ! errors
app.use([notFoundHandler, errorHandler]);

module.exports = app;
