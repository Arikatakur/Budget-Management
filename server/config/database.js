const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('budget', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;