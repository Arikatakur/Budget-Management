const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();

sequelize.authenticate()
  .then(() => console.log('MySQL Database connected...'))
  .catch(err => console.log('Error: ' + err));

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/suggestions', require('./routes/suggestionRoutes'));

sequelize.sync({ alter: true }).then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  console.log("Database synced with { alter: true }. All models should now match the database schema.");
}).catch(err => {
    console.error("Error syncing database:", err);
});
