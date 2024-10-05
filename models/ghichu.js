const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid'); // Import UUID v4

const GhiChu = sequelize.define('GhiChu', {
    _id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        allowNull: false,
        primaryKey: true
    },
    ho_ten: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    dien_thoai: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    noi_dung_ghi_chu: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'ghi_chu',
    timestamps: false
});

module.exports = GhiChu;
