const { hashPassword, comparePassword } = require('../utils/hashUtils');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { jwtSecret } = require('../config/config');
const { sendEmailOTP, sendPhoneOTP, validateOTP } = require('../services/otpService');
const { getInstagramUserDetails } = require('../services/instagramService');

// Register User
exports.registerUser = async (req, res, next) => {
    try {
        const { phone, email, instagram, otpPhone, otpEmail, password, firstname, lastname } = req.body;

        // Step 1: Verify Phone OTP
        const isPhoneVerified = await validateOTP(phone, otpPhone, 'phone');
        if (!isPhoneVerified) {
            return res.status(400).json({ error: 'Invalid or expired phone OTP' });
        }

        // Step 2: Verify Email OTP
        const isEmailVerified = await validateOTP(email, otpEmail, 'email');
        if (!isEmailVerified) {
            return res.status(400).json({ error: 'Invalid or expired email OTP' });
        }

        // Step 3: Verify Instagram Follower Count
        const instagramDetails = await getInstagramUserDetails(instagram);
        if (instagramDetails.error) {
            return res.status(400).json({ error: instagramDetails.error });
        }
        if (instagramDetails.followers < 1000000) {
            return res.status(400).json({ error: 'Instagram account does not meet follower count criteria (minimum 1M followers required)' });
        }

        // Step 4: Hash Password and Save User
        const hashedPassword = await hashPassword(password);

        const user = new User({
            phone,
            email,
            instagram,
            password: hashedPassword,
            firstname,
            lastname,
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key errors for unique fields
            return res.status(400).json({ error: 'Phone, email, or Instagram username already exists' });
        }
        next(error);
    }
};
