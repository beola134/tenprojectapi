const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
//thêm bình luận
//http://localhost:3000/comment/add
router.post('/add', commentController.addComment);

//lấy tất cả bình luận theo _id sản phẩm
//http://localhost:3000/comment/getAll/:id_san_pham
router.get('/getAll/:id_san_pham', commentController.getAllComment);

//lấy tất cả bình luận theo _id người dùng
//http://localhost:3000/comment/getAllUser/:id_nguoi_dung
router.get('/getAllUser/:id_nguoi_dung', commentController.getAllCommentUser);

//sửa bình luận theo _id nguoi_dung và _id sản phẩm
//http://localhost:3000/comment/edit/:id_nguoi_dung/:id_san_pham
router.put('/edit/:id_nguoi_dung/:id_san_pham', commentController.editComment);




module.exports = router;