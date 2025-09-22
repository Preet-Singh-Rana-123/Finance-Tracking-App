import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

app.use(express.json);
app.use(express.urlencoded);

app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
