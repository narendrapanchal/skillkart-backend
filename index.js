import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL;


import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import learnerRoutes from "./routes/learnerRoutes.js";
import commonPrivateRoutes from "./routes/commonPrivateRoutes.js";
import { protect } from "./middlewares/authMiddleware.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// public Apis
app.use("/api/public", publicRoutes);

app.use("/api/admin",protect(["admin"]), adminRoutes);

app.use("/api/learner",protect(["learner"]), learnerRoutes);

// common authentication required apis
app.use("/api/common",protect(["learner", "admin"]), commonPrivateRoutes);


app.listen(port, async () => {
    await mongoose.connect(DB_URL);
});
  