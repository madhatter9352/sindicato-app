import instance from "../utils/axios";

export const GetUsersByPage = async(page) => {
    try {
        const users = await instance.get(`/user/?page=${page}`);
        return users;
    } catch (error) {
        throw error;
    }
}