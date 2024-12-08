const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const rateLimiterMiddleware = require('./middlewares/rateLimiter');
const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rate limiting
app.use(rateLimiterMiddleware);

// Routes
app.use('/api', routes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

module.exports = app;
