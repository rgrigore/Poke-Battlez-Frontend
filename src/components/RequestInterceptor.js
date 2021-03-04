import axios from "axios";

const axiosInterceptor = axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInterceptor;