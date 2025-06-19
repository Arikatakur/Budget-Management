const Transaction = require('../models/Transaction');


exports.createTransaction = async (req, res) => {
  try {
    if (!req.body.userId) {
      return res.status(400).json({ error: 'userId is required in the request body.' });
    }
    const { type } = req.body;

    if (!type || !['income', 'expense'].includes(type)) {
      return res.status(400).json({ error: 'Transaction type must be either "income" or "expense".' });
    }
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getTransactions = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'A userId query parameter is required.' });
    }
    const transactions = await Transaction.findAll({ where: { userId } });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required in the request body to verify ownership.' });
    }

    const transaction = await Transaction.findOne({ where: { id: transactionId, userId: userId } });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found or you do not have permission to edit it.' });
    }

    const updatedTransaction = await transaction.update(req.body);
    res.json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'A userId query parameter is required to verify ownership.' });
    }

    const transaction = await Transaction.findOne({ where: { id: transactionId, userId: userId } });
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found or you do not have permission to delete it.' });
    }

    await transaction.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMonthlySummary = async (req, res) => { // Get the monthly summary of transactions for a user, added by noor still in checking
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required in query params.' });
    }

    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfToday = now;

    const transactions = await Transaction.findAll({
      where: {
        userId,
        date: {
          [require('sequelize').Op.between]: [startOfThisMonth, endOfToday]
        }
      }
    });

    let income = 0;
    let expenses = 0;

    transactions.forEach(tx => {
      if (tx.type === 'income') income += tx.amount;
      else if (tx.type === 'expense') expenses += tx.amount;
    });

    res.json({
      income,
      expenses,
      balance: income - expenses
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
