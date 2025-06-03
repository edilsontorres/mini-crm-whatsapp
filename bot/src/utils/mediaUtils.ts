import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { TEMP_UPLOAD_FOLDER } from '../config/path';
import FormData from 'form-data';

export const downloadMedia = async (base64: string, mime: string, fileName: string): Promise<string> => {
    const buffer = Buffer.from(base64, 'base64');

    if (!fs.existsSync(TEMP_UPLOAD_FOLDER)) {
        fs.mkdirSync(TEMP_UPLOAD_FOLDER, { recursive: true });
    }

    const fullPath = path.join(TEMP_UPLOAD_FOLDER, fileName);
    fs.writeFileSync(fullPath, buffer);

    return fullPath;
}

export const sendMediaToBackend = async (filePath: string, payLoad: object) => {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    Object.entries(payLoad).forEach(([key, value]) => {formData.append(key, value != null ? value.toString() : '')});

    console.log('Payload que chegou na funcao sendMediaToBackend: ');
    console.log(payLoad);
    console.log('Arquivo:', filePath);

    try {
        const response = await axios.post("http://localhost:5070/api/webhook/received-media", formData, {
            headers: formData.getHeaders()
        });
        return response.data;

    } catch (error: any) {
        if (error.response) {
            console.error("Erro no backend:", error.response.data);
        } else {
            console.error("Erro desconhecido:", error.message);
        }
    }

    // const response = await axios.post("http://localhost:5070/api/webhook/received-media", formData, {
    //     // headers: {
    //     //     'Content-Type': 'multipart/form-data',
    //     // }
    //     headers: formData.getHeaders()
    // });

    //return response.data;
}