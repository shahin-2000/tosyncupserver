const express = require('express');
const { sendEmailOTP, sendPhoneOTP } = require('../services/otpService');

// Send Email OTP
exports.sendEmailOtp = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const otp = await sendEmailOTP(email);
        res.status(200).json({ message: 'Email OTP sent successfully', otp });
    } catch (error) {
        next(error);
    }
};

// Send phone OTP
exports.sendPhoneOtp = async (req, res, next) => {
    try {
        const { phone } = req.body;
        console.log("phone: ",req)
        if (!phone) {
            return res.status(400).json({ error: 'Phone number is required' });
        }

        const otp = await sendPhoneOTP(phone);
        res.status(200).json({ message: 'Phone OTP sent successfully', otp });
    } catch (error) {
        next(error);
    }
};