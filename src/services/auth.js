import instance from "../utils/axios"

export const Login = async (params) => {
    try {
        return await instance.post('auth/login',params);
    }catch (error){
        throw error;
    }
}

export const Logout = async () => {
    try {
        return await instance.post('auth/logout');
    }catch (error){
        throw error;
    }
}

export const Register = async (params) => {
    try {
        return await instance.post('/user/', params);
    } catch (error) {
        throw error;
    }
}