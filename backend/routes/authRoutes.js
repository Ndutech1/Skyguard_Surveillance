const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure this path is correct

const codeStore = {}; // Temporary memory store (better with Redis)

// Registration route
router.post('/register', registerUser);

// Login route with 2FA code sending
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    codeStore[email] = code;

    // Email the code
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"SkyGuard" <${process.env.MAIL_USER}>`,
        to: email,
        subject: 'SkyGuard 2FA Code',
        text: `Your 2FA code is: ${code}`,
    });

    res.json({ message: '2FA code sent', step: 'verify' });
});

// 2FA verification route
router.post('/verify-2fa', async (req, res) => {
    const { email, code } = req.body;

    if (codeStore[email] !== code) {
        return res.status(401).json({ message: 'Invalid 2FA code' });
    }

    const user = await User.findOne({ email });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    delete codeStore[email];

    res.json({ token, user });
});

module.exports = router;
