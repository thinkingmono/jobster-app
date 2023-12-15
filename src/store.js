import { configureStore } from "@reduxjs/toolkit";
import userSlice from './features/user/userSlice'
import jobSlice from "./features/job/jobSlice";
import allJobsSlice from "./features/allJobs/allJobsSlice";

//Redux store configuration. Add userSlice, jobSlice and allJobsSlice reducers with usr, job and allJobs names to be access it in the rest of the app.
export const store = configureStore({
    reducer: {
        user: userSlice,
        job: jobSlice,
        allJobs: allJobsSlice
    }
})