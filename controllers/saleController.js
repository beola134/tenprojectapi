const Sale = require('../models/sale');
const Product = require('../models/product');


exports.createSale = async (req, res) => {
    const { khuyen_mai, mo_ta, trang_thai, bat_dau, ket_thuc, id_san_pham, ty_le_giam_gia } = req.body;

    try {
        // Lấy thông tin sản phẩm để tính giá giảm
        const product = await Product.findOne({ where: { _id: id_san_pham } });
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        // Tính giá giảm
        const gia_giam = product.gia_san_pham * (ty_le_giam_gia / 100);
        const gia_sau_khi_giam = product.gia_san_pham - gia_giam;

        // Tạo khuyến mãi mới
        const newSale = await Sale.create({
            khuyen_mai,
            mo_ta,
            trang_thai,
            bat_dau,
            ket_thuc,
            id_san_pham
        });

        // Cập nhật giá sản phẩm sau khi giảm
        await Product.update(
            { gia_giam: gia_sau_khi_giam },
            { where: { _id: id_san_pham } }
        );

        res.status(201).json(newSale);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm dữ liệu', error });
    }
};


