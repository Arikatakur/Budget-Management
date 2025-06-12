// server.js

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); // Import the sequelize instance

const app = express();

// --- Test Database Connection ---
sequelize.authenticate()
  .then(() => console.log('MySQL Database connected...'))
  .catch(err => console.log('Error: ' + err));

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.use('/api/auth', require('./routes/auth'));

// --- Sync Database ---
// This creates the table if it doesn't exist. For production, you'd use migrations.
sequelize.sync().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});