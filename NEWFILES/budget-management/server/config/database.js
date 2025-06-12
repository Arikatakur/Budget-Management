// config/database.js
const { Sequelize } = require('sequelize');

// Replace with your actual MySQL database credentials
// For a real app, these should be in a .env file
const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;