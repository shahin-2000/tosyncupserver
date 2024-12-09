const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        phone: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        instagram: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
