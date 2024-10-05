const DonHang = require('../models/donhang');
const ChiTietDonHang = require('../models/chitietdonhang');
const GhiChu = require('../models/ghichu');
const PhuongThucThanhToan = require('../models/pttt');
const Product = require('../models/product');
const Users = require("../models/users");
const Voucher = require('../models/voucher');
const { v4: uuidv4 } = require('uuid'); // Import UUID v4
const { Op } = require('sequelize'); // Import Sequelize operators

const addDonHang = async (req, res) => {
    let {
        dia_chi,
        tong_tien,
        trang_thai,
        da_thanh_toan,
        phi_ship,
        thoi_gian_tao,
        id_nguoi_dung,
        id_phuong_thuc_thanh_toan,
        ghi_chu,
        chi_tiet_don_hang,
        ma_voucher
    } = req.body;

    try {
        let totalAmount = 0;
        if (chi_tiet_don_hang && chi_tiet_don_hang.length > 0) {
            for (const ct of chi_tiet_don_hang) {
                const product = await Product.findByPk(ct.id_san_pham);
                if (product) {
                    if (product.so_luong < ct.so_luong) {
                        throw new Error(`Số lượng sản phẩm ${product.ten_san_pham} không đủ`);
                    }
                    totalAmount += product.gia_san_pham * ct.so_luong;
                    product.so_luong -= ct.so_luong;
                    await product.save();
                } else {
                    throw new Error(`Sản phẩm với ID ${ct.id_san_pham} không tồn tại`);
                }
            }
        }

        totalAmount += phi_ship || 0;

        let voucher = null;
        if (ma_voucher) {
            voucher = await Voucher.findOne({
                where: {
                    ma_voucher,
                    bat_dau: {
                        [Op.lte]: new Date()
                    },
                    ket_thuc: {
                        [Op.gte]: new Date()
                    }
                }
            });
        }

        if (voucher) {
            totalAmount -= voucher.gia_tri;
        }
        totalAmount = Math.max(totalAmount, 0);
        da_thanh_toan = totalAmount === 0;
        const donHang = await DonHang.create({
            _id: uuidv4(),
            dia_chi,
            tong_tien: totalAmount,
            trang_thai,
            da_thanh_toan: totalAmount,
            phi_ship,
            thoi_gian_tao,
            id_nguoi_dung,
            id_phuong_thuc_thanh_toan: id_phuong_thuc_thanh_toan || null,
            ghi_chu,
            id_voucher: voucher ? voucher._id : null
        });

        if (chi_tiet_don_hang && chi_tiet_don_hang.length > 0) {
            const chiTietPromises = chi_tiet_don_hang.map(async (ct) => {
                const product = await Product.findByPk(ct.id_san_pham);
                if (product) {
                    await ChiTietDonHang.create({
                        gia_san_pham: product.gia_san_pham,
                        ten_san_pham: product.ten_san_pham,
                        so_luong: ct.so_luong,
                        id_don_hang: donHang._id,
                        id_san_pham: ct.id_san_pham
                    });
                }
            });
            await Promise.all(chiTietPromises);
        }

        res.status(201).json({ message: 'Đơn hàng đã được thêm thành công', donHang });
    } catch (error) {
        console.error('Lỗi khi thêm đơn hàng:', error);
        res.status(500).json({ message: 'Lỗi khi thêm đơn hàng', error });
    }
};

module.exports = {
    addDonHang
};
