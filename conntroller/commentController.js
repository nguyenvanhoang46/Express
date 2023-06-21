const { check, validationResult } = require('express-validator');
const Comment = require('../models/comment');

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('post', 'content');
        res.status(201).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const createComment = async (req, res) => {
    try {
        await check('content')
            .notEmpty().withMessage('Nội dung không được bỏ trống')
            // .isLength({ max: 100 }).withMessage('Nội dung không được vượt quá 100 ký tự')
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { content, post } = req.body;
        const comment = new Comment({ content, post });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const updateComment = async (req, res) => {
    try {
        await check('content')
            .notEmpty().withMessage('Nội dung không được bỏ trống')
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { content } = req.body;
        const comment = await Comment.findByIdAndUpdate(
            req.params.commentId, { content }, { new: true }
        );
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteComment = async (req, res) => {
    try {
        await check('commentId')
            .notEmpty().withMessage('commentId không được bỏ trống')
            .isMongoId().withMessage('commentId phải là 1 id hợp lệ')
            .run(req)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const commment = await Comment.findByIdAndDelete(req.params.commentId);
        if (!commment) {
            return res.status(404).json({ message: 'Bài viết không tồn tại' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    getAllComments,
    createComment,
    updateComment,
    deleteComment
}