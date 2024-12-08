const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const rateLimiterMiddleware = require('./middlewares/rateLimiter');
const logger = require('./utils/logger');
const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger
app.use(morgan('combined'));
// Rate limiting
app.use(rateLimiterMiddleware);
// Logger
app.use(logger);

// Routes
app.use('/api', routes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

module.exports = app;
