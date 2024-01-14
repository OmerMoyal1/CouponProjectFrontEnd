import axios from "axios";
import { request } from "http";
import { authStore } from "../Redux/AuthState";

export function createInterceptor(){
    axios.interceptors.request.use(request=>{
        const token=authStore.getState().token;
    if(token)
    request.headers={authorization: "Bearer "+token}
    return request;
})
}