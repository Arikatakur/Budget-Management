// server/routes/auth.js

const express = require('express');
const router = express.Router();

// 1. Import the correct controller functions
const { registerUser, loginUser } = require('../controllers/userController');

// 2. Use the controller functions as the route handlers.
// All the complex logic is now correctly handled by userController.js

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login a user
router.post('/login', loginUser);

module.exports = router;
