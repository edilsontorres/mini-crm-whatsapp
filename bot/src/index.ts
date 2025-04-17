import express from 'express';
import dotnenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import webhookRoutes from './routes/webhookRoutes';
import { initWhatsapp } from './bot/client';

dotnenv.config();
initWhatsapp();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api", webhookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Webhook rodando em http://localhost:${PORT}`);
});