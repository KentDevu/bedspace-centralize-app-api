import dotenv from 'dotenv';
dotenv.config();

interface AppConfig {
  port: number;
  jwtSecret: string;
  databaseUrl: string;
}

export const config: AppConfig = {
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  databaseUrl: process.env.DATABASE_URL || '',
}; 