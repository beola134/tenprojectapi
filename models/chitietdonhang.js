const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid'); // Import UUID v4

const ChiTietDonHang = sequelize.define('ChiTietDonHang', {
    _id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        allowNull: false,
        primaryKey: true
    },
    gia_san_pham: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    ten_san_pham: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    so_luong: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    id_don_hang: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    id_san_pham: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'chi_tiet_don_hang',
    timestamps: false
});

module.exports = ChiTietDonHang;
