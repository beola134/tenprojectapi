const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database')
const { v4: uuidv4 } = require('uuid'); // Import UUID v4

const DonHang = sequelize.define('DonHang', {
    _id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        allowNull: false,
        primaryKey: true
    },
    dia_chi: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    tong_tien: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    trang_thai: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    da_thanh_toan: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    phi_ship: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    thoi_gian_tao: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    id_nguoi_dung: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    id_phuong_thuc_thanh_toan: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    ghi_chu: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    id_voucher: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'don_hang',
    timestamps: false
});

module.exports = DonHang;
