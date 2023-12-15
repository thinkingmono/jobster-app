import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";
import { clearStoreThunk, loginUserThunk, registerUserThunk, updateUserThunk } from "./userThunk";

//registerUser function to create an user in the server. Pass action name and async function call returning thunk function passing API route, user information and thunkAPI as parameters.
export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user, thunkAPI) => {
        return registerUserThunk('/auth/register', user, thunkAPI);
    }
);

//loginUser function to log in user into platform if it exist. Pass action name and async function call returning thunk function passing API route, user information and thunkAPI as parameters.
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user, thunkAPI) => {
        return loginUserThunk('/auth/login', user, thunkAPI);
    }
)

//updateUser function to update an user info in the server. Pass action name and async function call returning thunk function passing API route, user information and thunkAPI as parameters.
export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (user, thunkAPI) => {
        return updateUserThunk('/auth/updateUser', user, thunkAPI);
    }
)

//clearStore function to clear store. Pass action name and thunk function call to dispatch logoutUser, clearAllJobsState and clearValues.
export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);

//User's initial state
const initialState = {
    isLoading: false,
    isSidebarOpen: false,
    user: getUserFromLocalStorage()
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        //Set user to null, hide sidebar, remove user from local storage and show sucess notification if there is a payload
        logoutUser: (state, { payload }) => {
            state.user = null;
            state.isSidebarOpen = false;
            // toast.success('Logout Successful!');
            removeUserFromLocalStorage();
            if (payload) {
                toast.success(payload);
            }
        },
        //sidebar toggle, show or hide.
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                //Set loading to true while request is on pending.
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                //Destructure user from payload
                const { user } = payload;
                //Set loading to false when request is fulfilled.
                state.isLoading = false;
                //Set user state with user form payload.
                state.user = user;
                //Save user data to browser's local storage.
                addUserToLocalStorage(user);
                //Success notification
                toast.success(`Hello there ${user.name}`);
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                //Set loading to false when request is rejected.
                state.isLoading = false;
                //Error notification
                toast.error(payload);
            })
            .addCase(loginUser.pending, (state) => {
                //Set loading to true while request is pending.
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                //Destructure user from payload
                const { user } = payload;
                //Set loading to false when request is fulfilled.
                state.isLoading = false;
                //Set user state with user from payload.
                state.user = user;
                //Save user data to browser's local storage.
                addUserToLocalStorage(user);
                //Success notification
                toast.success(`Welcome back ${user.name}`);
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                //Set loading to false when request is rejected.
                state.isLoading = false;
                //Error notification
                toast.error(payload);
            })
            .addCase(updateUser.pending, (state) => {
                //Set loading to true while request is pending.
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                //Destructure user from payload
                const { user } = payload;
                //Set loading to false when request is fulfilled.
                state.isLoading = false;
                //Set user state with user form payload.
                state.user = user;
                //Save user data to browser's local storage.
                addUserToLocalStorage(user);
                //Success notification
                toast.success(`User updated`);
            })
            .addCase(updateUser.rejected, (state, { payload }) => {
                //Set loading to false when request is rejected.
                state.isLoading = false;
                //Error notification
                toast.error(payload);
            })
            .addCase(clearStore.rejected, () => {
                //Error notification
                toast.error('there was an error');
            })
    }
});

//Export user slice actions
export const { toggleSidebar, logoutUser } = userSlice.actions;

//Export user slice reducer
export default userSlice.reducer;