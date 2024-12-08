const mongoose = require('mongoose');
const { dbUri } = require('./config');

const connectDB = async () => {
    try {
        await mongoose.connect(dbUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
