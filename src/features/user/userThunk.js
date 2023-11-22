import { logoutUser } from "./userSlice";
import authFetch from '../../utils/index';

export const registerUserThunk = async (url, user, thunkAPI) => {
    // console.log(`Register user: ${JSON.stringify(user)}`);
    try {
        const response = await authFetch.post(url, user);
        // toast.success('Account created successfully');
        // console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}

export const loginUserThunk = async (url, user, thunkAPI) => {
    // console.log(`Login User: ${JSON.stringify(user)}`);
    try {
        const response = await authFetch.post(url, user);
        // console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}

export const updateUserThunk = async (url, user, thunkAPI) => {
    try {
        const response = await authFetch.patch(url, user, {
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
            }
        });
        // console.log(response);
        return response.data
    } catch (error) {
        console.log(error.response);
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}