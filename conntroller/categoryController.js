const Category = require('../models/category');
const { check, validationResult } = require('express-validator');


const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(201).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const createCategory = async (req, res) => {
    try {

        await check('name').notEmpty().withMessage("danh mục không được bỏ trống")
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Không hợp lệ' })
        }
        const category = new Category({ name })
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateCategory = async (req, res) => {
    try {
        await check('name').notEmpty().withMessage("danh mục không được bỏ trống")
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Không hợp lệ' })
        }
        const category = await Category.findByIdAndUpdate(
            {
                _id: req.params.categoryId
            },
            { name },
            { new: true }
        )
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteCategory = async (req, res) => {
    try {
        await check('categoryId')
            .notEmpty().withMessage('categoryId không được để trống')
            .isMongoId().withMessage('categoryId phải là một id hợp lệ')
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const category = await Category.findByIdAndDelete(req.params.categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Danh mục không tồn tại' });
        }
        res.status(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllCategory,
    createCategory,
    updateCategory,
    deleteCategory
}