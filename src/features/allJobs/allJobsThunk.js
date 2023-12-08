import authFetch, { checkForUnauthorizedResponse } from "../../utils";


export const getAllJobsThunk = async (_, thunkAPI) => {
    const { page, search, searchStatus, searchType, sort } = thunkAPI.getState().allJobs;
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if (search) {
        url = url + `&search=${search}`;
    }
    try {
        const response = await authFetch(url);
        // console.log(response.data);
        return response.data
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const showStatsThunk = async (_, thunkAPI) => {
    try {
        const response = await authFetch('/jobs/stats');
        // console.log(response);
        return response.data;
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}