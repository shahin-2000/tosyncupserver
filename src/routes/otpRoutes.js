const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verificationController');
const otpController = require('../controllers/otpController');


router.post('/send-email-otp', otpController.sendEmailOtp);
router.post('/send-phone-otp', otpController.sendPhoneOtp);
router.post('/verify-email-otp', verificationController.verifyEmail);
router.post('/verify-phone-otp', verificationController.verifyPhone);
router.post('/verify-instagram', verificationController.verifyInstagram);

module.exports = router;