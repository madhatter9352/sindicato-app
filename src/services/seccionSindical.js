import instance from "../utils/axios";

export const GetSeccionesSindicales = async() => {
    try {
        const secciones = await instance.get('/union-section/');
        return secciones.data;
    } catch (error) {
        throw error;
    }
}

export const CreateSeccionSindical = async(values) => {
    try {
        const payload = {
            name: values.name,
            area_id: values.area
        };

        const seccion = await instance.post('/union-section/', payload);
        return seccion;
    } catch (error) {
        throw error;
    }
}

export const GetSeccionSindicalById = async(id) => {
    try {
        const seccion = await instance.get(`/union-section/${id}`);
        return seccion;
    } catch (error) {
        throw error;
    }
}

export const UpdateSeccionSindical = async(id, name, area) => {
    try {
        const seccion = await instance.put(`/union-section/${id}/`, {
            name,
            area_id: area,
            initial_state_id: 1
        });
        return seccion;
    } catch (error) {
        throw error;
    }
}

export const DeleteSeccion = async(id) => {
    try {
        const response = await instance.delete(`/union-section/${id}/`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const GetSeccionesByPage = async(page) => {
    try {
        const secciones = await instance.get(`/union-section/?page=${page}`);
        return secciones.data;
    } catch (error) {
        throw error;
    }
}