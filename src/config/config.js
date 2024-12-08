require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    dbUri: process.env.DB_URI,
    jwtSecret: process.env.JWT_SECRET,
    saltRounds: parseInt(process.env.SALT_ROUNDS, 10) || 10,
    env: process.env.NODE_ENV || 'development',
};

module.exports = config;