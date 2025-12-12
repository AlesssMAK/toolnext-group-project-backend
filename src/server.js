import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from "cookie-parser";

import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';

import toolRouters from './routes/toolsRoutes.js';
import bookingsRoutes from './routes/bookingsRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import authRoutes from './routes/authRoutes.js';


const app = express();
const PORT = 3000;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(toolRouters);
app.use(bookingsRoutes);
app.use(authRoutes);
app.use(feedbackRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
