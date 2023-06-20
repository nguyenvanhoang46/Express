const express = require('express');
const router = express.Router();

const categoryConntroller = require('../conntroller/categoryController')


router.get('/getAllCategory', categoryConntroller.getAllCategory);

router.post('/createCategory', categoryConntroller.createCategory);

router.put('/updateCategory/:categoryId', categoryConntroller.updateCategory);

router.delete('/deleteCategory/:categoryId', categoryConntroller.deleteCategory);



module.exports = router;