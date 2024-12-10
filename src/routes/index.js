const express = require('express');
const authRoutes = require('./authRoutes');
const otpRoutes = require('./otpRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/verify', otpRoutes);

module.exports = router;
