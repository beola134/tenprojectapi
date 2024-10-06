const CMT = require('../models/comment');
const Product = require('../models/product');
const Users = require("../models/users");

//Bình luận sản phẩm theo _id sản phẩm và _id người dùng
exports.addComment = async (req, res) => {
    try {
        const { id_san_pham, id_nguoi_dung, noi_dung, sao } = req.body;
        //kiểm tra xem sản phẩm và người dùng có tồn tại không
        const product = await Product.findOne({ where: { _id: id_san_pham } });
        const user = await Users.findOne({ where: { _id: id_nguoi_dung } });
        if (!product) {
            return res.status(400).json({ message: "Không tìm thấy sản phẩm" });
        }
        if (!user) {
            return res.status(400).json({ message: "Không tìm thấy người dùng" });
        }
        //tạo bình luận
        const comment = await CMT.create({
            noi_dung,
            sao,
            id_nguoi_dung,
            id_san_pham
        });
        res.status(201).json(comment);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Lỗi server" });

    }
}

//lấy tất cả bình luận theo _id sản phẩm
exports.getAllComment = async (req, res) => {
    try {
        const { id_san_pham } = req.params;
        //kiểm tra xem sản phẩm có tồn tại không
        const product = await Product.findOne({ where: { _id: id_san_pham } });
        if (!product) {
            return res.status(400).json({ message: "Không tìm thấy sản phẩm" });
        }
        //lấy tất cả bình luận theo _id sản phẩm
        const comments = await CMT.findAll({ where: { id_san_pham } });
        res.status(200).json(comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Lỗi server" });
    }
}

//lấy tất cả bình luận theo _id người dùng
exports.getAllCommentUser = async (req, res) => {
    try {
        const { id_nguoi_dung } = req.params;
        //kiểm tra xem người dùng có tồn tại không
        const user = await Users.findOne({ where: { _id: id_nguoi_dung } });
        if (!user) {
            return res.status(400).json({ message: "Không tìm thấy người dùng" });
        }
        //lấy tất cả bình luận theo _id người dùng
        const comments = await CMT.findAll({ where: { id_nguoi_dung } });
        res.status(200).json(comments);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Lỗi server" });
    }
}

//sửa bình luận theo _id nguoi_dung và _id sản phẩm
exports.editComment = async (req, res) => {
    try {
        const { id_nguoi_dung, id_san_pham } = req.params;
        const { noi_dung, sao } = req.body;
        //kiểm tra xem bình luận có tồn tại không
        const comment = await CMT.findOne({ where: { id_nguoi_dung, id_san_pham } });
        if (!comment) {
            return res.status(400).json({ message: "Không tìm thấy bình luận" });
        }
        //sửa bình luận
        comment.noi_dung = noi_dung;
        comment.sao = sao;
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Lỗi server" });
    }
}


