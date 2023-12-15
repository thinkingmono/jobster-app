import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllJobsThunk, showStatsThunk } from "./allJobsThunk";

//Filter's field initial state
const initialFiltersState = {
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
}

//allJobs slice initial state
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

//getAllJobs function to fetch user jobs. Pass action name and thunk request function call.
export const getAllJobs = createAsyncThunk('allJobs/getAllJobs', getAllJobsThunk);

//showStats function to fetch stats from the server. Pass action name and thunk request function call.
export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunk);

const allJobsSlice = createSlice({
    name: 'allJobs',
    initialState,
    reducers: {
        //Set loading to true. Show loader
        showLoading: (state) => {
            state.isLoading = true;
        },
        //Set loading to false. Hide loader
        hideLoading: (state) => {
            state.isLoading = false;
        },
        //Set filters value. Destructuring the prop name and value from the payload.
        handleChange: (state, { payload: { name, value } }) => {
            state.page = 1;
            state[name] = value;
        },
        //Set default filters and initial state.
        clearFilters: (state) => {
            return { ...state, ...initialFiltersState }
        },
        //Handle page change seting page from the payload passed from dispatch.
        changePage: (state, { payload }) => {
            state.page = payload;
        },
        //Set state to initial state.
        clearAllJobsState: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllJobs.pending, (state) => {
                //Set loading to true while request is on pending.
                state.isLoading = true;
            })
            .addCase(getAllJobs.fulfilled, (state, { payload }) => {
                //Set loading to false when request is complete.
                state.isLoading = false;
                //Set state jobs array with jobs destructure from the payload, return from request response.
                state.jobs = payload.jobs;
                //Set state numOfPages with numOfPages destructure from the payload, return from request response.
                state.numOfPages = payload.numOfPages;
                ////Set state totalJobs with totalJobs destructure from the payload, return from request response.
                state.totalJobs = payload.totalJobs;
            })
            .addCase(getAllJobs.rejected, (state, { payload }) => {
                //Set loading to false when request failed.
                state.isLoading = false;
                //Error notification
                toast.error(payload);
            })
            .addCase(showStats.pending, (state) => {
                //Set loading to false while request is pending.
                state.isLoading = true;
            })
            .addCase(showStats.fulfilled, (state, { payload }) => {
                //Set loading to false when request is complete.
                state.isLoading = false;
                //Set state stats object with stats destructure from the payload, return from request response.
                state.stats = payload.defaultStats;
                //Set state monthlyApplications array with monthlyApplications destructure from the payload, return from request response.
                state.monthlyApplications = payload.monthlyApplications;
            })
            .addCase(showStats.rejected, (state, { payload }) => {
                //Set loading to false when request failed.
                state.isLoading = false;
                //Error notification
                toast.error(payload);
            })
    }
})

//Export allJobs slice actions
export const { showLoading, hideLoading, handleChange, clearFilters, changePage, clearAllJobsState } = allJobsSlice.actions;

//Export allJobs slice reducer
export default allJobsSlice.reducer;