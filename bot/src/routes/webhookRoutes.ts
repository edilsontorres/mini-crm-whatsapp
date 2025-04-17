import { Router } from "express";
import { handleIcommingMessage } from '../controllers/webhookController';
import { sendMessage } from '../controllers/sendMessageController';

const router = Router();

router.post("/webhook", handleIcommingMessage);
router.post("/send-message", sendMessage);

export default router;