const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid'); // Import UUID v4
const BinhLuan = sequelize.define('BinhLuan', {
    _id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        allowNull: false,
        primaryKey: true
    },
    noi_dung: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    sao: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    ngay_binh_luan: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    id_nguoi_dung: {
        type: DataTypes.STRING(255),
        allowNull: true,
        index: true
    },
    id_san_pham: {
        type: DataTypes.STRING(255),
        allowNull: true,
        index: true
    }
}, {
    tableName: 'binh_luan',
    timestamps: false
});

module.exports = BinhLuan;
