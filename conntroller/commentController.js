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
        const { content, post } = req.body;
        if (!content) {
            return res.status(400).json({ message: 'vui long nhap ten' })
        }
        const comment = new Comment({ content, post });
        await comment.save();
        res.status(201).json(comment)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateComment = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: "Vui lòng cung cấp đủ thông tin bài viết" })
        }
        const comment = await Comment.findByIdAndUpdate(
            req.params.commentId, { content }, { new: true }
        );
        res.status(201).json(comment)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteComment = async (req, res) => {
    try {
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