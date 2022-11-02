import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.response.use(async response => {
    return response;
}, error => {
    if(error.code === 'ERR_NETWORK'){
        toast.error(`${error.message}`, {
            theme: 'colored'
        });
    } else {
        const {data, status, config} = error.response;
        console.log(status)
        console.log(data)
    }

    return Promise.reject(error);
})

export default instance;