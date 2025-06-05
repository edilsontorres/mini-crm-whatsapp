import { Router } from "express";
import { sendMessage } from '../controllers/sendMessageController';
import { sendMediaMessage } from "../controllers/sendMediaMessageController";

const router = Router();

router.post("/send-message", sendMessage);
router.post("/send-media-message", sendMediaMessage);

export default router;