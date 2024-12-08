const { hashPassword, comparePassword } = require('../utils/hashUtils');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

const registerUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await hashPassword(password);

        // Save to database (replace with actual DB code)
        // Example: await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Find user in DB (replace with actual DB code)
        // Example: const user = await User.findOne({ username });

        const isPasswordValid = await comparePassword(password, 'storedHashedPassword');
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: 'userId' }, jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

module.exports = { registerUser, loginUser };
