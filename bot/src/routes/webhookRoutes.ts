import { Router } from "express";
import { handleIcommingMessage } from '../controllers/webhookController';

const router = Router();

router.post("/webhook", handleIcommingMessage);

export default router;