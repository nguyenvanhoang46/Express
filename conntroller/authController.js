const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');


const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        await check('email').notEmpty().withMessage("Email không được bỏ trống!").isEmail().withMessage("Email không hợp lệ!").run(req);
        await check('password').notEmpty().withMessage("Mật khẩu không được bỏ trống!").run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email đã được sử dụng!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const userRegister = new User({ email, password: hashedPassword })
        await userRegister.save();
        res.status(201).json({ userRegister })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        await check('email').isEmpty().withMessage("Email không được bỏ trống!").isEmail().withMessage("Email không hợp lệ!").run(req);
        await check('password').isEmpty().withMessage("Mật khẩu không được bỏ trống!").run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() })
        }

        const userLogin = await User.findOne({ email })

        if (!userLogin) {
            return res.status(400).json({ message: "Email không tồn tại!" })
        }

        const passwordMatch = await bcrypt.compare(password, userLogin.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Mật khẩu không đúng!" });
        }

        const accessToken = jwt.sign({ userId: userLogin._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })

        const refreshToken = jwt.sign({ userId: userLogin._id }, process.env.REFRESH_TOKEN_SECRET);

        res.json({ userLogin, accessToken, refreshToken });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMe = async (req, res) => {
    try {
        const userId = req.userId;
        
        const user = await User.findById(userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại!' });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    register,
    login,
    getMe,
};