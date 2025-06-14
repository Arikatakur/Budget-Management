// server/server.js

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); // Sequelize instance

const app = express();

// --- Test DB Connection ---
sequelize.authenticate()
  .then(() => console.log('MySQL Database connected...'))
  .catch(err => console.log('Error: ' + err));

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.use('/api/auth', require('./routes/auth')); // i'll use api/users for this, but i've kept it because u added it monther.

// added routes for user management, transactions, categories, and AI suggestions
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/suggestions', require('./routes/suggestionRoutes'));

// --- Sync Models & Start Server ---
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
