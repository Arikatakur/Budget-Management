const User = require('./User');
const Transaction = require('./Transaction');
const Category = require('./Category');
const AISuggestion = require('./AISuggestion');

// Relationships
User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User);

User.hasMany(Category, { foreignKey: 'userId' });
Category.belongsTo(User);

User.hasMany(AISuggestion, { foreignKey: 'userId' });
AISuggestion.belongsTo(User);
