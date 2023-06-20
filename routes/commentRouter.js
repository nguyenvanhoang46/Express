const express = require('express');
const router = express.Router();
const commentController = require('../conntroller/commentController')


router.get('/allcomment', commentController.getAllComments);

router.post('/createComment', commentController.createComment)

router.put('/updateComment/:commentId', commentController.updateComment)

router.delete('/deleteComment/:commentId', commentController.deleteComment)



module.exports = router;

