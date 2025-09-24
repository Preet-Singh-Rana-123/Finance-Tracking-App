const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

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

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
