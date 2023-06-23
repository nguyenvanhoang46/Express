const { check, validationResult } = require('express-validator');
const Post = require('../models/post');


const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().populate('categories', 'name')
        res.status(201).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const createPost = async (req, res) => {
    try {
        await check('title').notEmpty().withMessage('Tiêu đề không được bỏ trống').run(req);
        await check('content').notEmpty().withMessage('Nội dung không được bỏ trống').run(req);
        // await check('categories').isArray({ min: 1 }).withMessage('Phải chọn ít nhất một danh mục').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, content, categories } = req.body;
        const post = new Post({ title, content, categories });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const updatePost = async (req, res) => {
    try {
        await check('title').notEmpty().withMessage('Tiêu đề không được bỏ trống').run(req);
        await check('content').notEmpty().withMessage('Nội dung không được bỏ trống').run(req);

        // await check('categories').isArray({ min: 1 }).withMessage('Phải chọn ít nhất một danh mục').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, content, categories } = req.body;
        if (!title || !content || !categories) {
            return res.status(400).json({ message: "Vui lòng cung cấp đủ thông tin bài viết" })
        }
        const post = await Post.findByIdAndUpdate(
            req.params.postId,
            { title, content, categories },
            { new: true }
        );
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deletePost = async (req, res) => {
    try {
        await check('postId')
            .notEmpty().withMessage('postId không được để trống')
            .isMongoId().withMessage('postId phải là một id hợp lệ')
            .run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const post = await Post.findByIdAndDelete(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: 'Bài viết không tồn tại' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllPost,
    createPost,
    updatePost,
    deletePost
}