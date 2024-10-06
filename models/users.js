const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid'); // Import UUID v4

const User = sequelize.define('User', {
    _id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        allowNull: false,
        primaryKey: true
    },
    ten_dang_nhap: {
        type: DataTypes.STRING(255),
        allowNull: false

    },
    mat_khau: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    ho_ten: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    dia_chi: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    dien_thoai: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    hinh_anh: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    quyen: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '2'
    },
    resetPasswordToken: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    resetPasswordExpires: {  //này là
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'nguoi_dung',
    timestamps: false,
});

module.exports = User;
