const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('duantotnghiep', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false

});

module.exports = sequelize;
