import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://assignment.stage.crafto.app",
    headers: {
        "Content-Type": "application/json",
    },
});

export const login = async (payload) => {
    return await axiosInstance.post("/login", payload);
};

export const uploadMedia = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return await axios.post(
        "https://crafto.app/crafto/v1.0/media/assignment/upload",
        formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
};

export const createQuote = async (token, payload) => {
    const response = await axiosInstance.post("/postQuote", payload, {
        headers: { Authorization: token },
    });
    return response.data;
};

export const getQuotes = async (token, limit, offset) => {
    const response = await axiosInstance.get("/getQuotes", {
        headers: { Authorization: token },
        params: { limit, offset },
    });
    return response.data;
};
