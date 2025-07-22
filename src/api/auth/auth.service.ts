import { RegisterUserDto } from '../../common/dtos/register-user.dto';
import { LoginUserDto } from '../../common/dtos/login-user.dto';
import { UserDto } from '../../common/dtos/user.dto';
import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../../config';

/**
 * Service for authentication logic (register, login, JWT)
 */
export class AuthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Register a new user (tenant or landlord)
   */
  async registerUser(data: RegisterUserDto): Promise<UserDto> {
    const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      throw new Error('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
    });
    return new UserDto(user.id, user.name, user.email, user.role);
  }

  /**
   * Login a user and return JWT
   */
  async loginUser(data: LoginUserDto): Promise<{ token: string; user: UserDto }> {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) {
      throw new Error('Invalid credentials');
    }
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
    return { token, user: new UserDto(user.id, user.name, user.email, user.role) };
  }
} 