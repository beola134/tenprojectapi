const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

// Route để cập nhật giá sale và cập nhật giá giảm cho sản phẩm
//http://localhost:3000/sale
router.post('/', saleController.createSale);
module.exports = router;
