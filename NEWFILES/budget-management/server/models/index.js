const sequelize    = require('../config/database');   
const User        = require('./User');
const Transaction = require('./Transaction');
const Category    = require('./Category');
const AISuggestion= require('./AISuggestion');

User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Category, { foreignKey: 'userId' });
Category.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(AISuggestion, { foreignKey: 'userId' });
AISuggestion.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Transaction,
  Category,
  AISuggestion
};
