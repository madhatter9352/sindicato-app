import axios from "axios";
import {toast} from "react-toastify";
import { history } from "../App";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(function (config) {
    console.log(config)
    console.log(false && true)
    if (config.url.indexOf('login') === -1 && config.url.indexOf('user') === -1) {
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
    } else if(config.url.indexOf('user') !== -1 && config.method !== 'post') {
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


instance.interceptors.response.use(async response => {
    return response;
}, async error => {
    const originalRequest = error.config;

    if (error.code === 'ERR_NETWORK') {
        toast.error(`${error.message}`, {
            theme: 'colored'
        });
    } 
    if(error.response.status === 500) {
        //const {data, status, config} = error.response;
        console.log(error)
        history.push('/server-error', error.response.data);
    }
    console.log(error)
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // const access = await refreshAccessToken();
        // originalRequest.headers['Authorization'] = 'Bearer ' + access
        // return instance(originalRequest);
        localStorage.clear()
        history.push('/login')
    } else if (error.response.status === 401 && originalRequest._retry) {
        localStorage.clear()
        window.location.href = '/'
    }
    return Promise.reject(error);
})

const refreshAccessToken = () => {
    return instance.post('auth/token/refresh/', {
        'refresh': localStorage.getItem('refresh_token')
    }).then(res => {
        localStorage.setItem('access_token', res.data['access'])
        return res.data['access']
    }).catch(err =>{
        console.log(err)
    })
}

export default instance;