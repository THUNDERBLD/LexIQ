import axios from "axios";
import FormData from "form-data";

export const sendToML = async (fileBuffer, fileName) => {
    try {
        const form = new FormData();

        form.append("file", fileBuffer, fileName);

        const response = await axios.post(
            "http://127.0.0.1:8000/api/predict/",
            form,
            {
                headers: form.getHeaders(),
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
                timeout: 120000,
                validateStatus: () => true
            }
        );

        console.log("ML STATUS:", response.status);
        console.log("ML DATA:", response.data);

        return response.data;

    } catch (error) {
        console.error("ML ERROR:", error.message);

        return {
            success: false,
            error: error.message
        };
    }
};