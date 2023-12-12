import { logoutUser } from "./userSlice";
import authFetch, { checkForUnauthorizedResponse } from '../../utils/index';
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";

export const registerUserThunk = async (url, user, thunkAPI) => {
    // console.log(`Register user: ${JSON.stringify(user)}`);
    try {
        const response = await authFetch.post(url, user);
        // toast.success('Account created successfully');
        // console.log(response);
        return response.data;
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const loginUserThunk = async (url, user, thunkAPI) => {
    // console.log(`Login User: ${JSON.stringify(user)}`);
    try {
        const response = await authFetch.post(url, user);
        // console.log(response);
        return response.data;
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const updateUserThunk = async (url, user, thunkAPI) => {
    try {
        const response = await authFetch.patch(url, user);
        // console.log(response);
        return response.data
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const clearStoreThunk = async (message, thunkAPI) => {
    try {
        thunkAPI.dispatch(logoutUser(message));
        thunkAPI.dispatch(clearAllJobsState());
        thunkAPI.dispatch(clearValues());
        return Promise.resolve();
    } catch (error) {
        return Promise.reject();
    }
}