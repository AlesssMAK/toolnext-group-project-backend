import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import bookingsRoutes from './routes/bookingsRoutes.js';

import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(bookingsRoutes);
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const categoriesRouter = require("./src/routes/categories.routes");

app.use("/api/categories", categoriesRouter);

const { seedCategories } = require("./src/db/seedCategories");

mongoose.connection.once("open", async () => {
  await seedCategories();
});

