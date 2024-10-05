const Pttt = require("../models/pttt");
//them phuong thuc thanh toan
exports.addPttt = async (req, res) => {
  try {
    const { _id, ten_phuong_thuc } = req.body;
    if (!ten_phuong_thuc) {
      return res.status(400).json({ message: "không tìm thấy tên pttt" });
    }
    const pttt = await Pttt.create({ _id, ten_phuong_thuc });
    res.status(201).json(pttt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
