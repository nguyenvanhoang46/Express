const express = require('express');
const router = express.Router();
const postConntroller = require('../conntroller/postConntroller')

router.get('/getAllComment', postConntroller.getAllPost);

router.post('/createPost', postConntroller.createPost);

router.put('/updatePost/:postId', postConntroller.updatePost);

router.delete('/deletePost/:postId', postConntroller.deletePost);


module.exports = router;
