const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');


const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        await check('email').notEmpty().withMessage('Email không được bỏ trống').run(req);
        await check('password').notEmpty().withMessage('Mật khẩu không được bỏ trống').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Người dùng đã tồn tại' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'your-secret-key');

        res.status(201).json({ user, token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        await check('email').notEmpty().withMessage('email không được bỏ trống').run(req);
        await check('password').notEmpty().withMessage('mật khẩu khồng được bỏ trống').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Người dùng không tồn tại' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Mật khẩu không đúng' });
        }

        const token = jwt.sign({ userId: user._id }, 'your-secret-key');

        res.json({ user, token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    register,
    login,
};