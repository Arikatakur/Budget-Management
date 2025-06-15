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
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
});

module.exports = AISuggestion;
