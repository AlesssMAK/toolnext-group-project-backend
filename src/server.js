// src/server.js
import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errors } from "celebrate";
import { connectMongoDB } from "./db/connectMongoDB.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";

// Підключаємо .env з папки src
dotenv.config({ path: path.resolve("src/.env") });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use("/categories", categoriesRoutes);

// Обробка помилок
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

// Підключення до MongoDB та запуск сервера
const startServer = async () => {
  await connectMongoDB(); // process.env.MONGO_URI тепер підхопиться правильно
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();


