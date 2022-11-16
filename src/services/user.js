import instance from "../utils/axios";

export const GetUsersByPage = async(page) => {
    try {
        const users = await instance.get(`/user/?page=${page}`);
        return users;
    } catch (error) {
        throw error;
    }
}

export const DeleteUser = async(id) => {
    try {
        const users = await instance.delete(`/user/${id}/`);
        return users;
    } catch (error) {
        throw error;
    }
}

export const GetUserById = async(id) => {
    try {
        const user = await instance.get(`/user/${id}`);
        return user;
    } catch (error) {
        throw error;
    }
}

export const EditUser = async(id, values) => {
    try {
        const user = await instance.put(`/user/${id}/`, values);
        return user;
    } catch (error) {
        throw error;
    }
}