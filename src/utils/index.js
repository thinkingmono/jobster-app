import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

const authFetch = axios.create({
    baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit'
});

authFetch.interceptors.request.use(
    (config) => {
        const user = getUserFromLocalStorage();
        if (user) {
            config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default authFetch;