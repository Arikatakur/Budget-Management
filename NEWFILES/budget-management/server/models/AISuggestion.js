const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AISuggestion = sequelize.define('AISuggestion', {
  suggestionText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dateGenerated: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'new', // or 'viewed'
  }
});

module.exports = AISuggestion;
