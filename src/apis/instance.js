import axios from "axios";

const NEXT_APP_API_BASE_URL = "https://api.unsplash.com";
const NEXT_APP_API_KEY =process.env.NEXT_PUBLIC_KEY;

const openInstance = axios.create({
    baseURL: NEXT_APP_API_BASE_URL,
})

export {openInstance , NEXT_APP_API_KEY};