const express = require('express');
const router = express.Router();
// Import the new controller function
const { getUserById, updateUserIncome } = require('../controllers/userController');

// This route should already exist
router.get('/:id', getUserById);

// --- ADD THIS NEW ROUTE ---
// @route   PUT /api/users/:id/income
// @desc    Update a user's average income
router.put('/:id/income', updateUserIncome);

module.exports = router;
