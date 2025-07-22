import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterUserDto } from '../../common/dtos/register-user.dto';
import { LoginUserDto } from '../../common/dtos/login-user.dto';

/**
 * Controller for authentication endpoints (register, login, etc.)
 */
export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Register a new user
   */
  async register(req: Request, res: Response): Promise<void> {
    try {
      const dto = new RegisterUserDto(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.role
      );
      const user = await this.authService.registerUser(dto);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: err instanceof Error ? err.message : 'Registration failed' });
    }
  }

  /**
   * Login a user
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const dto = new LoginUserDto(req.body.email, req.body.password);
      const result = await this.authService.loginUser(dto);
      res.status(200).json(result);
    } catch (err) {
      res.status(401).json({ message: err instanceof Error ? err.message : 'Login failed' });
    }
  }
} 