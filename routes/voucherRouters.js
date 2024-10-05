const express = require('express');
const router = express.Router();
const voucher = require('../controllers/voucherController');

//Thêm voucher
//http://localhost:3000/voucher
router.post('/', voucher.addVoucher);

module.exports = router;