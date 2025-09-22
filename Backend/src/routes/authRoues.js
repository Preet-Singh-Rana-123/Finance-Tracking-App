import express from 'express';
import authController from '../controllers/authControllers';
import authMiddleware from '../middleware/authMiddleware';

const authRouter = express.Router();

authRouter.post('/register', authController.postRegister);
authRouter.post('/login', authController.postLogin);

export default authRouter;
