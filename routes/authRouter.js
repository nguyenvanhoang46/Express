const express = require('express');
const router = express.Router();

const authConntroller = require('../conntroller/authController')
const authMiddleware = require('../middleware/Authentication')

router.post('/login', authConntroller.login);

router.post('/register', authConntroller.register);

router.get('/getMe', authMiddleware, authConntroller.getMe);



module.exports = router;