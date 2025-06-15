// server/controllers/userController.js

console.log("--- LOADING userController.js - VERSION: FINAL-NO-JWT ---"); // <-- ADD THIS LINE

const User = require('../models/User');
const bcrypt = require('bcryptjs');

// --- User Login (UPDATED) ---
exports.loginUser = async (req, res) => {
  
  console.log("--- ENTERING loginUser function ---"); // <-- ADD THIS LINE

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log("--- Password is a match. Sending user data. ---"); // <-- ADD THIS LINE
    res.json({ user });

  } catch (err) {
    console.error("Login Error:", err); 
    res.status(500).json({ error: err.message });
  }
};


// ... (The rest of your functions: registerUser, getUserById, updateUserIncome) ...
// (You can copy them from the Canvas to make sure the file is complete)
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }
    const user = await User.create({ name, email, password, phone });
    res.status(201).json({ msg: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
exports.updateUserIncome = async (req, res) => {
  try {
    const { averageIncome } = req.body;
    const userId = req.params.id;

    if (typeof averageIncome !== 'number') {
      return res.status(400).json({ error: 'averageIncome must be a number.' });
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.averageIncome = averageIncome; 
    await user.save();
    res.json({ msg: 'User income updated successfully', user });
  } catch (err) {
    console.error('Error updating income:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
