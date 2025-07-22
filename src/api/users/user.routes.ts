import { Router } from 'express';
import { UserController } from './user.controller';
import { authenticateJWT } from '../../common/middlewares/auth.middleware';

const router = Router();
const controller = new UserController();

router.get('/me', authenticateJWT, (req, res) => controller.getMe(req, res));

export default router; 