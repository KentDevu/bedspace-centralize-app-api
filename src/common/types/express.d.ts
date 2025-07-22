import { Role } from './roles';

declare global {
  namespace Express {
    interface UserPayload {
      id: number;
      email: string;
      role: Role;
    }
    interface Request {
      user?: UserPayload;
    }
  }
} 