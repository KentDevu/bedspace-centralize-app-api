import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserDto } from '../../common/dtos/user.dto';

/**
 * Controller for user-related endpoints (profile, list, etc.)
 */
export class UserController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Get the authenticated user's profile
   */
  async getMe(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const user = await this.prisma.user.findUnique({ where: { id: req.user.id } });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(new UserDto(user.id, user.name, user.email, user.role));
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch user profile' });
    }
  }
} 