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

//Request to create a job
export const createJobThunk = async (job, thunkAPI) => {
    try {
        // const response = await authFetch.post('/jobs', job, authHeader(thunkAPI));*
        //POST request using authFetch axios custom instance to create a job in to the server. Pass job data from add job form.
        const response = await authFetch.post('/jobs', job);
        //Call thunkAPI to dispatch clearValues and clear the add job form.
        thunkAPI.dispatch(clearValues());
        return response.data;
    } catch (error) {
        //401 Unauthorize error handling routine.
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

//Request to delete a job
export const deleteJobThunk = async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        // const response = await authFetch.delete(`/jobs/${jobId}`, authHeader(thunkAPI));*
        //DELETE request using authFetch axios custom instance to DELETE a job in to the server. Pass job id into route.
        const response = await authFetch.delete(`/jobs/${jobId}`);
        // console.log(response);
        //Call thunkAPI to dispatch getAllJbs and refresh jobs list without deleted one.
        thunkAPI.dispatch(getAllJobs());
        return response.data
    } catch (error) {
        //Call thunkAPI to dispatch hideLoading then show the error.
        thunkAPI.dispatch(hideLoading());
        //401 Unauthorize error handling routine.
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

//Request to edit a job
export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
    try {
        // const response = await authFetch.patch(`/jobs/${jobId}`, job, authHeader(thunkAPI));*
        //PATCH request using authFetch axios custom instance to UPDATE a job in to the server. Pass job id into route and new job data.
        const response = await authFetch.patch(`/jobs/${jobId}`, job);
        // console.log(response);
        //Call thunkAPI to dispatch clearValues and clear the edit job form.
        thunkAPI.dispatch(clearValues());
        return response.data;
    } catch (error) {
        //401 Unauthorize error handling routine.
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}