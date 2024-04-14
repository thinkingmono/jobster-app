import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";
import { clearStore } from "../features/user/userSlice";

//Axios custom instance creation. Set server baseUrl for queries.
const authFetch = axios.create({
    // baseURL: 'http://localhost:5000/api/v1'
    baseURL: 'https://jobster-server-alejandrowebdev.onrender.com/api/v1'
});

//Set authorization header into custom instance if there is an user stores into browser's local storage.
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

//Unauthorize error handler function. Check if error cached is a 401. If it is clear user session and logs out.
export const checkForUnauthorizedResponse = (error, thunkAPI) => {
    console.log(error);
    if (error.response.status === 401) {
        thunkAPI.dispatch(clearStore());
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
}

export default authFetch;
