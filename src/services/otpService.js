const otpGenerator = require('otp-generator');
const otpStore = new Map(); // Temporary in-memory store, replace with a DB in production

// Generate and send OTP
exports.sendEmailOTP = async (email) => {
    const otp = otpGenerator.generate(6, { digits: true });
    otpStore.set(email, otp); // Save OTP temporarily
    otpStore.set(`${email}_expires`, Date.now() + 5 * 60 * 1000); // Expiry: 5 minutes

    // Integrate with email sending service (e.g., SendGrid, SES)
    console.log(`Sent OTP ${otp} to email ${email}`);
    return otp;
};

exports.sendPhoneOTP = async (phone) => {
    const otp = otpGenerator.generate(6, { digits: true });
    otpStore.set(phone, otp);
    otpStore.set(`${phone}_expires`, Date.now() + 5 * 60 * 1000);

    // Integrate with SMS sending service (e.g., Twilio, Nexmo)
    console.log(`Sent OTP ${otp} to phone ${phone}`);
    return otp;
};

// Validate OTP
exports.validateOTP = async (identifier, otp, type) => {
    const storedOtp = otpStore.get(identifier);
    const expiry = otpStore.get(`${identifier}_expires`);

    if (!storedOtp || !expiry || expiry < Date.now()) {
        return false;
    }

    if (storedOtp !== otp) {
        return false;
    }

    otpStore.delete(identifier); // Invalidate OTP
    otpStore.delete(`${identifier}_expires`);
    return true;
};
