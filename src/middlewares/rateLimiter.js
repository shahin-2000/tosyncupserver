const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
    points: 10, // Number of requests
    duration: 1, // Per second
});

const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter
        .consume(req.ip)
        .then(() => next())
        .catch(() => res.status(429).json({ error: 'Too many requests. Please try again later.' }));
};

module.exports = rateLimiterMiddleware;
