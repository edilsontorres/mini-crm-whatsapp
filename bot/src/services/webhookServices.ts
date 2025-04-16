import axios from "axios"

export const processWebhookMessage = async(phoneNumber:string, message:string) => {

    await axios.post("http://localhost:5070/api/webhook", {
        phoneNumber,
        message
    });
}