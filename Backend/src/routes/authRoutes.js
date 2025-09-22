import express from 'express';
import {postRegister, postLogin} from '../controllers/authControllers.js';

const authRouter = express.Router();

authRouter.post('/register', postRegister);
authRouter.post('/login', postLogin);

export default authRouter;
