import { openInstance ,NEXT_APP_API_KEY} from "./instance";


const postAPIs = {
    getAllPosts : async (pageNumber) =>{
        return openInstance.get(`/photos/?page=${pageNumber}&&client_id=${NEXT_APP_API_KEY}`);
    }
}
const userAPIs = {
    getCurrentUser : async(user='vinilowraw')=>{
        return openInstance.get(`/users/${user}/?client_id=${NEXT_APP_API_KEY}`);
    },
    getCurrentUsersPost: async(pageNumber,user='vinilowraw')=>{
        return openInstance.get(`/users/${user}/photos?page=${pageNumber}&&client_id=${NEXT_APP_API_KEY}`);
    }
}
export const api = {
    ...postAPIs,
    ...userAPIs
}