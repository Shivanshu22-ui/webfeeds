import axios from "axios";

const NEXT_APP_API_BASE_URL = "https://api.unsplash.com";
const NEXT_APP_API_KEY = "1L47xI7TuQHBeiQhOrEETmfpb28a1-9FdJeoOw2-ufs";

const openInstance = axios.create({
    baseURL: NEXT_APP_API_BASE_URL,
})

export {openInstance , NEXT_APP_API_KEY};