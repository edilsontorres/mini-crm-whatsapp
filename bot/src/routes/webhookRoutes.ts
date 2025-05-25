import { Router } from "express";
import { handleIcommingMessage } from '../controllers/webhookController';
import { sendMessage } from '../controllers/sendMessageController';
import { sendMediaMessage } from "../controllers/sendMediaMessageController";

const router = Router();

router.post("/webhook", handleIcommingMessage);
router.post("/send-message", sendMessage);
router.post("/send-media-message", sendMediaMessage);

export default router;