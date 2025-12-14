import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errors } from "celebrate";
import { connectMongoDB } from "./db/connectMongoDB.js";

import toolRouters from "./routes/toolsRoutes.js";
import bookingsRoutes from "./routes/bookingsRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
app.use(toolRouters);
app.use(bookingsRoutes);
app.use(authRoutes);
app.use(feedbackRoutes);
app.use(userRoutes);

// 🔥 PUBLIC ENDPOINT
app.use("/api/categories", categoriesRoutes);

// errors
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectMongoDB();
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();

