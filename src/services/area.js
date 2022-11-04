import instance from "../utils/axios"

export const GetAreas = async() => {
    try {
        const areas = await instance.get('/area/');
        return areas.data
    } catch (error) {
        throw error;
    }
}

export const CreateArea = async(name) => {
    try {
        const area = await instance.post('/area/', name);
        return area;
    } catch (error) {
        throw error;
    }
}

export const DeleteArea = async(id) => {
    try {
        const area = await instance.delete(`/area/${id}/`);
        return area;
    } catch (error) {
        throw error;
    }
}

export const GetAreaById = async(id) => {
    try {
        const area = await instance.get(`/area/${id}/`);
        return area;
    } catch (error) {
        throw error;
    }
}

export const EditArea = async(id, name) => {
    try {
        const area = await instance.put(`/area/${id}/`, name);
        return area;
    } catch (error) {
        throw error;
    }
}

export const GetAreasByPage = async(page) => {
    try {
        const areas = await instance.get(`/area/?page=${page}`);
        return areas;
    } catch (error) {
        throw error;
    }
}