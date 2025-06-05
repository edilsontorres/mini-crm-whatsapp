import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { TEMP_UPLOAD_FOLDER } from '../config/path';
import FormData from 'form-data';
import mime from 'mime-types';

export const downloadMedia = async (base64: string, mimeType: string, fileName: string): Promise<string> => {
    const buffer = Buffer.from(base64, 'base64');

    if (!fs.existsSync(TEMP_UPLOAD_FOLDER)) {
        fs.mkdirSync(TEMP_UPLOAD_FOLDER, { recursive: true });
    }

    const extension = mime.extension(mimeType); // ex: 'jpg', 'mp3'
    const safeFileName = path.parse(fileName).name; // remove qualquer extensão anterior

    const fullFileName = `${safeFileName}.${extension}`; // garante extensão

    const fullPath = path.join(TEMP_UPLOAD_FOLDER, fullFileName);
    fs.writeFileSync(fullPath, buffer);

    return fullPath;
}

export const sendMediaToBackend = async (filePath: string, payLoad: object) => {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    Object.entries(payLoad).forEach(([key, value]) => { formData.append(key, value != null ? value.toString() : '') });

    try {
        const response = await axios.post("http://localhost:5070/api/webhook/received-media", formData, {
            headers: formData.getHeaders()
        });
        //Limpando os arquivos após o envio para o backend
        fs.unlink(filePath, (error) => {
            if (error) {
                console.error(`Erro ao tentar remover arquivo temporário ${filePath}:`, error);
            } else {
                console.log(`Arquivo temporário ${filePath} removido com sucesso.`);
            }
        });

        return response.data;

    } catch (error: any) {
        if (error.response) {
            console.error("Erro no backend:", error.response.data);
        } else {
            console.error("Erro desconhecido:", error.message);
        }
    }
}