import { Router } from "express";
import { nonce }  from '../controller/index.js';
const nonceRouter = Router();

nonceRouter.get('/:publicAddress', nonce.createNonce);

export default nonceRouter;