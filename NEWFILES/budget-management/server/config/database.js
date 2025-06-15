// config/database.js
const { Sequelize } = require('sequelize');

// Replace with your actual MySQL database credentials
// For a real app, these should be in a .env file
const sequelize = new Sequelize('budget', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;