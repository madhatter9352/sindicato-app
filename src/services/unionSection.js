import instance from "../utils/axios"

export const GetUnion_sections = async() => {
    try {
        const union_sections = await instance.get('/union-section/');
        return union_sections.data
    } catch (error) {
        throw error;
    }
}

export const CreateUnion_section = async(values) => {
    values = {...values, area_id: values.area, initial_state_id: values.initial_state}
    try {
        const union_section = await instance.post('/union-section/', values);
        return union_section;
    } catch (error) {
        throw error;
    }
}

export const DeleteUnion_section = async(id) => {
    try {
        const union_section = await instance.delete(`/union-section/${id}/`);
        return union_section;
    } catch (error) {
        throw error;
    }
}

export const GetUnion_sectionById = async(id) => {
    try {
        const union_section = await instance.get(`/union-section/${id}/`);
        return union_section;
    } catch (error) {
        throw error;
    }
}

export const EditUnion_section = async(id, name, area, initial_state) => {
    try {
        const union_section = await instance.put(`/union-section/${id}/`, {name, area_id: area, initial_state_id:initial_state});
        return union_section;
    } catch (error) {
        throw error;
    }
}

export const GetUnion_sectionsByPage = async(page) => {
    try {
        const union_sections = await instance.get(`/union-section/?page=${page}`);
        return union_sections;
    } catch (error) {
        throw error;
    }
}