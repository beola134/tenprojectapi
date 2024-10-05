const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');
const upload = require('../config/update');
const crypto = require('crypto');

// Lấy thông tin người dùng theo id
//http://localhost:3000/users/:id
router.get('/:id', usersController.getUserById);

// Đăng ký tài khoản
//http://localhost:3000/users/register
router.post('/register', upload.single('hinh_anh'), usersController.register);

// Đăng nhập tài khoản
//http://localhost:3000/users/login

// {
//     "email": "nguyentai12a72122@gmail.com",
//     "mat_khau": "1111111111"
// }

router.post('/login', usersController.login);

//quên mật khẩu
//http://localhost:3000/users/forgotpassword
router.post('/forgotpassword', usersController.forgotPassword);

//đặt lại mật khẩu
//http://localhost:3000/users/resetpassword/:resetToken
router.put('/resetpassword/:resetToken', usersController.resetPassword);

//đổi mật khẩu
//http://localhost:3000/users/changepassword
router.put('/changepassword', usersController.changePassword);

//api gửi mã về số điện thoại
//http://localhost:3000/users/sendotp
// router.post('/sendotp', usersController.sendOTP);

module.exports = router;
