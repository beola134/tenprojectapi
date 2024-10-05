const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const Product = sequelize.define('Product', {
    _id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        allowNull: false,
        primaryKey: true
    },
    ten_san_pham: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    ten: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    gia_san_pham: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    //gia_giam 	int(30)
    gia_giam: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    hinh_anh: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    mo_ta: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    do_chiu_nuoc: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    xuat_xu: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    gioi_tinh: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    so_luong: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    loai_may: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    duong_kinh: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    chat_lieu_day: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    chat_lieu_vo: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    mat_kinh: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    mau_mat: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    phong_cach: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    kieu_dang: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    ma_san_pham: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    id_danh_muc: {
        type: DataTypes.STRING(255),
        allowNull: true

    }

}, {
    tableName: 'san_pham',
    timestamps: false
});

module.exports = Product;
