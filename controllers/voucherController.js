const voucher = require("../models/voucher");

//thêm voucher
const addVoucher = async (req, res) => {
  const { ma_voucher, gia_tri, bat_dau, ket_thuc, mo_ta } = req.body;

  try {
    const newVoucher = await voucher.create({
      ma_voucher,
      gia_tri,
      bat_dau,
      ket_thuc,
      mo_ta,
    });

    res.status(201).json(newVoucher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addVoucher,
};
