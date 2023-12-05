import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authFetch from "../../utils";
import { toast } from "react-toastify";


const initialFiltersState = {
    search: '',
    searchstatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
}

const initialState = {
    isLoading: false,
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    ...initialFiltersState,
}

export const getAllJobs = createAsyncThunk('allJobs/getAllJobs',
    async (_, thunkAPI) => {
        let url = `/jobs`;

        try {
            const response = await authFetch(url, {
                headers: {
                    Authorization: `Bearer ${thunkAPI.getState().user.user.token}`
                }
            })
            // console.log(response.data);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    })

const allJobsSlice = createSlice({
    name: 'allJobs',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.isLoading = true;
        },
        hideLoading: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllJobs.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllJobs.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.jobs = payload.jobs;
        }).addCase(getAllJobs.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        })
    }
})

export const { showLoading, hideLoading } = allJobsSlice.actions;

export default allJobsSlice.reducer;