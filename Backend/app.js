import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/config/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
