const express = require('express');
const router = express.Router();
const donhangController = require('../controllers/donhangController');

//http://localhost:3000/donhang/donhang
router.post('/donhang',donhangController.addDonHang);

module.exports = router;