import { Router } from "express";
import nonceRouter from './nonce.js';
import authRouter from "./auth.js";
const mainRouter = Router();
mainRouter.use('/nonce', nonceRouter);
mainRouter.use('/auth', authRouter);

export default mainRouter;
