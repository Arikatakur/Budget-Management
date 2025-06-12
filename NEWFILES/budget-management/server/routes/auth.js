// routes/auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // 1. Check if user already exists using Sequelize's findOne
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    // 2. Create a new user using Sequelize's create method
    // The beforeCreate hook will automatically hash the password
    const newUser = await User.create({
      name,
      email,
      password,
      phone
    });

    // 3. Return a success response
    res.status(201).json({ msg: 'User registered successfully', userId: newUser.id });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;