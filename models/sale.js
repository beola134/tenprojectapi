const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const {v4: uuidv4} = require('uuid');
const Sale = sequelize.define('Sale', {
    _id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        allowNull: false,
        primaryKey: true
    },
    khuyen_mai: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    mo_ta: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    trang_thai: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    bat_dau: {
        type: DataTypes.DATE,
        allowNull: true
    },
    ket_thuc: {
        type: DataTypes.DATE,
        allowNull: true
    },
    id_san_pham: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'sale',
    timestamps: false
});

module.exports = Sale;