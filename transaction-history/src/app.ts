import express from "express";
import transactionRoutes from "./routes/transactionRoutes";
import connectDB from "./config/db";

const app = express();

connectDB();

app.use(express.json());

app.use("/api", transactionRoutes);

export default app;
