import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://d0ee-77-29-85-69.ngrok-free.app', // your ngrok URL
    withCredentials: true,
    headers: {
        "Content-type": 'application/json',
    },
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
        }
        return Promise.reject(error);
    }
);

export default axiosClient;