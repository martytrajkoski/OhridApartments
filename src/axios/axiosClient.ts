import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://api.theohridapartments.com/api",
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