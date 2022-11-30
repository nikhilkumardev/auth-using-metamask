import { Router } from "express";
import { auth }  from '../controller/index.js';
const authRouter = Router();

authRouter.post('/login', auth.login);

export default authRouter;