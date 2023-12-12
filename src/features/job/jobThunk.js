import authFetch, { checkForUnauthorizedResponse } from "../../utils";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import { clearValues } from "./jobSlice";

//Aproach without interceptor in authFetch custom axios instance.*
// const authHeader = (thunkAPI) => {
//     return {
//         headers: {
//             Authorization: `Bearer ${thunkAPI.getState().user.user.token}`
//         }
//     }
// }

export const createJobThunk = async (job, thunkAPI) => {
    try {
        // const response = await authFetch.post('/jobs', job, authHeader(thunkAPI));*
        const response = await authFetch.post('/jobs', job);
        thunkAPI.dispatch(clearValues());
        return response.data;
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const deleteJobThunk = async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        // const response = await authFetch.delete(`/jobs/${jobId}`, authHeader(thunkAPI));*
        const response = await authFetch.delete(`/jobs/${jobId}`);
        // console.log(response);
        thunkAPI.dispatch(getAllJobs());
        return response.data
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
    try {
        // const response = await authFetch.patch(`/jobs/${jobId}`, job, authHeader(thunkAPI));*
        const response = await authFetch.patch(`/jobs/${jobId}`, job);
        // console.log(response);
        thunkAPI.dispatch(clearValues());
        return response.data;
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}