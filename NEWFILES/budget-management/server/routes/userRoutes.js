const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const { User } = require('../models'); // <-- Import User model

// Auth routes
router.post('/register', registerUser);  // POST /api/users/register
router.post('/login', loginUser);        // POST /api/users/login

// Update average income for a user
router.put('/:id/income', async (req, res) => {
  try {
    const { averageIncome } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.averageIncome = averageIncome;
    await user.save();

    res.json({ message: 'Income updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = router;
