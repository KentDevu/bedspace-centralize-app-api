import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './api/auth/auth.routes';
import userRoutes from './api/users/user.routes';

// Load environment variables
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Serve static files (images)
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// Add more routes here

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // TODO: Use winston logger
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

export default app; 