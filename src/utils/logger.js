const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Setup write stream for logging
const logStream = fs.createWriteStream(path.join(__dirname, '../../logs/app.log'), { flags: 'a' });

const logger = morgan('combined', { stream: logStream });

module.exports = logger;
