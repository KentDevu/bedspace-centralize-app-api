import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to require a user to have one of the specified roles.
 * Assumes req.user is set by previous authentication middleware.
 */
export function requireRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
    next();
  };
} 