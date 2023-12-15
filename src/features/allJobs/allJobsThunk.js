import authFetch, { checkForUnauthorizedResponse } from "../../utils";

//Request to get all user's jobs.
export const getAllJobsThunk = async (_, thunkAPI) => {
    //Destructure allJobs slice state parameters from allJobs's store.
    const { page, search, searchStatus, searchType, sort } = thunkAPI.getState().allJobs;
    //API query build with search parameters
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    //If search field has a value concat with current query url.
    if (search) {
        url = url + `&search=${search}`;
    }
    try {
        //Send get API request using authFetch axios custom instance passing built url to get user's jobs.
        const response = await authFetch(url);
        // console.log(response.data);
        return response.data
    } catch (error) {
        //401 Unauthorize error handling routine.
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

//Request to get user's jobs stats by state.
export const showStatsThunk = async (_, thunkAPI) => {
    try {
        //Send get API request using authFetch axios custom instance passing query url to get user's jobs stats by state.
        const response = await authFetch('/jobs/stats');
        // console.log(response);
        return response.data;
    } catch (error) {
        //401 Unauthorize error handling routine.
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}