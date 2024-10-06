const Cate = require("../models/cate");
const upload = require("../config/update");

// Lấy tất cả danh mục
exports.getAllCates = async (req, res) => {
  try {
    const cates = await Cate.findAll();
    res.json(cates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Hàm xử lý việc thêm danh mục với hình ảnh
exports.addCate = async (req, res) => {
  try {
    upload.single("hinh_anh")(req, res, async (err) => {
      //nếu có lỗi khi upload file thì trả
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const { danh_muc, mo_ta } = req.body;
      const hinh_anh = req.file ? req.file.originalname : "";
      const cate = new Cate({ danh_muc, mo_ta, hinh_anh });
      await cate.save();
      res.json(cate);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Hàm xử lý việc xóa danh mục
exports.deleteCate = async (req, res) => {
  try {
    const cate = await Cate.findOne({ where: { _id: req.params.id } });
    if (!cate) {
      return res.status(404).json({ error: "Không tìm thấy danh mục" });
    }
    await cate.destroy();
    res.json({ message: "Xóa danh mục thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hàm xử lý việc cập nhật danh mục
exports.updateCate = async (req, res) => {
  try {
    // Tìm danh mục theo ID
    const cate = await Cate.findOne({ where: { _id: req.params.id } });
    if (!cate) {
      return res.status(404).json({ error: "Không tìm thấy danh mục" });
    }
    // Xử lý upload ảnh
    upload.single("hinh_anh")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      // Cập nhật dữ liệu
      const { danh_muc, mo_ta } = req.body;
      cate.danh_muc = danh_muc || cate.danh_muc;
      cate.mo_ta = mo_ta || cate.mo_ta;
      cate.hinh_anh = req.file ? req.file.originalname : cate.hinh_anh;
      // Lưu thay đổi
      await cate.save();
      // Trả về kết quả
      res.json(cate);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};