const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const chartRoutes = require("./routes/chartRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const goalRoutes = require("./routes/goalRoutes");
const aiInsightRoutes = require("./routes/aiInsightRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost", // Production Docker container frontend
    "http://localhost:5173", // Local Vite development frontend
    "http://localhost:3000", // Local CRA development frontend (just in case)
    "http://127.0.0.1:5173",
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            // 1. If we are running locally in development mode, allow flexible local origins
            if (process.env.NODE_ENV === "development") {
                const isLocal =
                    origin.startsWith("http://localhost:") ||
                    origin.startsWith("http://127.0.0.1:") ||
                    origin.startsWith("http://192.168.");

                if (isLocal) {
                    return callback(null, true);
                }
            }

            // 2. In Production, enforce the strict whitelist strictly
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    }),
);

// Routes
app.use("/auth", authRoutes);
app.use("/chart", chartRoutes);
app.use("/category", categoryRoutes);
app.use("/budget", budgetRoutes);
app.use("/transaction", transactionRoutes);
app.use("/goal", goalRoutes);
app.use("/ai", aiInsightRoutes);

app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
});
