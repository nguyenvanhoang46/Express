const express = require('express');
const router = express.Router();

const authConntroller = require('../conntroller/authController')



router.post('/login', authConntroller.login);

router.post('/register', authConntroller.register);





module.exports = router;