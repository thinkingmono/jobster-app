import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authFetch from "../../utils";
import { logoutUser } from "../user/userSlice";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";

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

export const createJob = createAsyncThunk(
    'job/createJob',
    async (job, thunkAPI) => {
        try {
            const response = await authFetch.post('/jobs', job, {
                headers: {
                    Authorization: `Bearer ${thunkAPI.getState().user.user.token}`
                }
            });
            thunkAPI.dispatch(clearValues());
            return response.data;
        } catch (error) {
            if (error.response.status === 401) {
                thunkAPI.dispatch(logoutUser());
                return thunkAPI.rejectWithValue('Unauthorized! Logging out...')
            }
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const deleteJob = createAsyncThunk('job/deleteJob', async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await authFetch.delete(`/jobs/${jobId}`, {
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        // console.log(response);
        thunkAPI.dispatch(getAllJobs());
        return response.data
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})

export const editJob = createAsyncThunk('job/editJob', async ({ jobId, job }, thunkAPI) => {
    try {
        const response = await authFetch.patch(`/jobs/${jobId}`, job, {
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        });
        console.log(response);
        thunkAPI.dispatch(clearValues());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        handleChange: (state, { payload: { name, value } }) => {
            state[name] = value;
        },
        clearValues: () => {
            return { ...initialState, jobLocation: getUserFromLocalStorage()?.location || '' }
        },
        setEditJob: (state, { payload }) => {
            return { ...state, isEditing: true, ...payload }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createJob.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createJob.fulfilled, (state) => {
                state.isLoading = false;
                toast.success('Job created');
            })
            .addCase(createJob.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
            .addCase(editJob.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editJob.fulfilled, (state) => {
                state.isLoading = false;
                toast.success('Job modified');
            })
            .addCase(editJob.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
    }
})

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;