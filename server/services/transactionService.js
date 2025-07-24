// services/transactionService.js
const { Op } = require('sequelize');
const Transaction = require('../models/Transaction');

exports.monthlySummary = async (userId, month) => {
  // Parse the input month, e.g., '2025-07'
  const startDate = new Date(`${month}-01T00:00:00.000Z`);
  const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1));

  // Fetch all transactions for this user in this month
  const list = await Transaction.findAll({
    where: {
      userId,
      date: {
        [Op.gte]: startDate,
        [Op.lt]: endDate,
      }
    }
  });

  const income = list
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = list
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    income,
    expense,
    balance: income - expense
  };
};
