const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');

const advController = require('./controllers/advController');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/AppError');

const app = express();

// Security configurations
// -------------------------------------------

// Rate-limiting: limit to 100 requests per hour per IP:
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests, please try again later',
});
app.use('/', limiter);

// Set various http headers for security:
app.use(helmet());

//We only have one route for a get request:
app.get('/advertisers', advController.getAdvertisers);

// Handle Unimplemented routes:
app.all('*', (req, res, next) =>
  next(new AppError(`Cannot find ${req.originalUrl}`, 404)),
);

// Compress text responses:
app.use(compression());

// Global error-handling middleWare:
app.use(globalErrorHandler);

module.exports = app;
