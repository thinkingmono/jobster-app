import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authFetch from "../../utils";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user, thunkAPI) => {
        // console.log(`Register user: ${JSON.stringify(user)}`);
        try {
            const response = await authFetch.post('/auth/register', user);
            toast.success('Account created successfully');
            // console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user, thunkAPI) => {
        // console.log(`Login User: ${JSON.stringify(user)}`);
        try {
            const response = await authFetch.post('/auth/login', user);
            // console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

const initialState = {
    isLoading: false,
    user: getUserFromLocalStorage()
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`Hello there ${user.name}`);
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`Welcome back ${user.name}`);
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
    }
});

export const { } = userSlice.actions;

export default userSlice.reducer;