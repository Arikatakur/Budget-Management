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
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// --- Routes ---
// The single, correct route for authentication
app.use('/api/auth', require('./routes/auth')); 

// Routes for user management, transactions, categories, and AI suggestions
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/suggestions', require('./routes/suggestionRoutes'));


// --- Sync Models & Start Server ---
// The { alter: true } option will automatically add the missing 'phone' column to your database.
sequelize.sync({ alter: true }).then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  console.log("Database synced with { alter: true }. All models should now match the database schema.");
}).catch(err => {
    console.error("Error syncing database:", err);
});
