import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";

//Job slice initial state object
const initialState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: ''
}

//createJob function to create an user's job in the server via API. Pass action name and thunk request function call.
export const createJob = createAsyncThunk('job/createJob', createJobThunk);

//deleteJob function to delete an user's job from the server via API. Pass action name and thunk request function call.
export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);

//editJob function to edit an user's job from the server via API. Pass action name and thunk request function call.
export const editJob = createAsyncThunk('job/editJob', editJobThunk);

//jobSlice configuration
const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        //Add job page fields value change control. Modifies the state corresponding propertie when their field value changes.
        handleChange: (state, { payload: { name, value } }) => {
            state[name] = value;
        },
        //Set state with default values and captures user's location if it is already stored in browser's local storage.
        clearValues: () => {
            return { ...initialState, jobLocation: getUserFromLocalStorage()?.location || '' }
        },
        //Set state with edit parameter to true, pass current state and job values. Use to change a job propertie and then update it.
        setEditJob: (state, { payload }) => {
            return { ...state, isEditing: true, ...payload }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createJob.pending, (state) => {
                //Set loading to true while request is on pending.
                state.isLoading = true;
            })
            .addCase(createJob.fulfilled, (state) => {
                //Set loading to false when request is complete.
                state.isLoading = false;
                //Success notification
                toast.success('Job created');
            })
            .addCase(createJob.rejected, (state, { payload }) => {
                //Set loading to true when request is rejected.
                state.isLoading = false;
                //Success notification
                toast.error(payload);
            })
            .addCase(deleteJob.fulfilled, (state, { payload }) => {
                //Success notification
                toast.success('Job deleted');
            })
            .addCase(deleteJob.rejected, (state, { payload }) => {
                //Error notification
                toast.error(payload);
            })
            .addCase(editJob.pending, (state) => {
                //Set loading to true while request is on pending.
                state.isLoading = true;
            })
            .addCase(editJob.fulfilled, (state) => {
                //Set loading to false when request is complete.
                state.isLoading = false;
                //Success notification
                toast.success('Job modified');
            })
            .addCase(editJob.rejected, (state, { payload }) => {
                //Set loading to true when request is rejected.
                state.isLoading = false;
                //Success notification
                toast.error(payload);
            })
    }
})

//Actions export from jobSlice.
export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

//Reducer export
export default jobSlice.reducer;