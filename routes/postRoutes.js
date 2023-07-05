const express = require('express');
const router = express.Router();
const postConntroller = require('../conntroller/postConntroller')
const authMiddleware = require('../middleware/Authentication')


router.get('/getAllComment',authMiddleware, postConntroller.getAllPost);

router.post('/createPost', authMiddleware, postConntroller.createPost);

router.put('/updatePost/:postId', authMiddleware, postConntroller.updatePost);

router.delete('/deletePost/:postId', authMiddleware, postConntroller.deletePost);


module.exports = router;
