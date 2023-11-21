import axios from "axios";

const authFetch = axios.create({
    baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit'
});

export default authFetch;