const Transaction = require('../models/Transaction');

// --- Create a new transaction ---
// The frontend must send the transaction data, including the 'userId', in the request body.
exports.createTransaction = async (req, res) => {
  try {
    // Check if userId is provided in the body
    if (!req.body.userId) {
      return res.status(400).json({ error: 'userId is required in the request body.' });
    }
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// --- Get all transactions for a specific user ---
// The frontend must send the userId as a query parameter in the URL.
// Example: GET /api/transactions?userId=1
exports.getTransactions = async (req, res) => {
  try {
    const { userId } = req.query; // Destructure userId from the query
    if (!userId) {
      // This check is what causes the '400 Bad Request' error if the frontend doesn't send the ID.
      return res.status(400).json({ error: 'A userId query parameter is required.' });
    }
    const transactions = await Transaction.findAll({ where: { userId } });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// --- Update a transaction ---
// We've improved this to ensure a user can only update their own transactions.
exports.updateTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const { userId } = req.body; // The frontend should send the userId in the body for verification.

    if (!userId) {
      return res.status(400).json({ error: 'userId is required in the request body to verify ownership.' });
    }

    // Find the transaction by its ID and the user's ID to ensure they own it.
    const transaction = await Transaction.findOne({ where: { id: transactionId, userId: userId } });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found or you do not have permission to edit it.' });
    }

    // Update the transaction with the new data from the body
    const updatedTransaction = await transaction.update(req.body);
    res.json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// --- Delete a transaction ---
// We've improved this to ensure a user can only delete their own transactions.
exports.deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    // For DELETE, we get the userId from the query params for verification.
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'A userId query parameter is required to verify ownership.' });
    }

    const transaction = await Transaction.findOne({ where: { id: transactionId, userId: userId } });
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found or you do not have permission to delete it.' });
    }

    await transaction.destroy();
    res.status(204).send(); // .send() or .end() is fine here.
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
