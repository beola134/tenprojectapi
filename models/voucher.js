const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Voucher = sequelize.define('Voucher', {
    _id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),  // Tạo UUID tự động
        allowNull: false,
        primaryKey: true
    },
    ma_voucher: {
        type: DataTypes.STRING(255),  // VARCHAR(255)
        allowNull: false
    },
    gia_tri: {
        type: DataTypes.INTEGER,  // INT
        allowNull: true, 
        defaultValue: null
    },
    bat_dau: {
        type: DataTypes.DATE,  // DATETIME
        allowNull: true,
        defaultValue: null
    },
    ket_thuc: {
        type: DataTypes.DATE,  // DATETIME
        allowNull: true,
        defaultValue: null

    },
    mo_ta: {
        type: DataTypes.STRING(100),  // VARCHAR(100)
        allowNull: true,
        defaultValue: null
    }
}, {
    tableName: 'voucher',  
    timestamps: false  
});

module.exports = Voucher;
