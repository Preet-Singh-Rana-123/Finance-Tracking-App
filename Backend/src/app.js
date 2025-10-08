const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const chartRoutes = require('./routes/chartRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const budgetRoutes = require('./routes/budgetRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/chart', chartRoutes);
app.use('/category', categoryRoutes);
app.use('/budget', budgetRoutes);

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
