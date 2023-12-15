import { logoutUser } from "./userSlice";
import authFetch, { checkForUnauthorizedResponse } from '../../utils/index';
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";

//Request to register a new user into the server
export const registerUserThunk = async (url, user, thunkAPI) => {
    // console.log(`Register user: ${JSON.stringify(user)}`);
    try {
        //POST request using authFetch axios custom instance to create a new user in to the server. Pass user data from profile form.
        const response = await authFetch.post(url, user);
        // toast.success('Account created successfully');
        // console.log(response);
        return response.data;
    } catch (error) {
        //401 Unauthorize error handling routine.
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const loginUserThunk = async (url, user, thunkAPI) => {
    // console.log(`Login User: ${JSON.stringify(user)}`);
    try {
        //POST request using authFetch axios custom instance to login an user into the platform. Pass user data from login form.
        const response = await authFetch.post(url, user);
        // console.log(response);
        return response.data;
    } catch (error) {
        //401 Unauthorize error handling routine.
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const updateUserThunk = async (url, user, thunkAPI) => {
    try {
        //PATCH request using authFetch axios custom instance to update the user information. Pass new user data from profile form.
        const response = await authFetch.patch(url, user);
        // console.log(response);
        return response.data
    } catch (error) {
        //401 Unauthorize error handling routine.
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const clearStoreThunk = async (message, thunkAPI) => {
    try {
        //thunkAPI dispatch to run logoutUser passing a logout message for notification
        thunkAPI.dispatch(logoutUser(message));
        //thunkAPI dispatch to run clearAllJobsState
        thunkAPI.dispatch(clearAllJobsState());
        //thunkAPI dispatch to run clearValues
        thunkAPI.dispatch(clearValues());
        return Promise.resolve();
    } catch (error) {
        return Promise.reject();
    }
}