const User = require('../models/userModel');
const { sendEmailOTP, sendPhoneOTP, validateOTP } = require('../services/otpService');
const { getInstagramUserDetails } = require('../services/instagramService');

// Verify Email OTP
exports.verifyEmail = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const isValid = await validateOTP(email, otp, 'email');
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        next(error);
    }
};

// Verify Phone OTP
exports.verifyPhone = async (req, res, next) => {
    try {
        const { phone, otp } = req.body;
        console.log(phone, otp);
        const isValid = await validateOTP(phone, otp, 'phone');
        console.log(isValid);
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        res.json({ message: 'Phone verified successfully' });
    } catch (error) {
        next(error);
    }
};

// Verify Instagram Follower Count
exports.verifyInstagram = async (req, res, next) => {
    try {
        const { instagram } = req.body;
        console.log("instagram : ",instagram);
        const userDetails = await getInstagramUserDetails(instagram);
        console.log("userDetails : ",userDetails);
        if (userDetails.error) {
            return res.status(400).json({ error: userDetails.error });
        }

        if (userDetails.followers < 1000000) {
            return res.status(400).json({ error: 'Instagram account does not meet follower count criteria' });
        }

        res.json({ message: 'Instagram verified successfully', data: userDetails });
    } catch (error) {
        next(error);
    }
};
