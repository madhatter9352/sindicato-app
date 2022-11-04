import instance from "../utils/axios";

export const GetSeccionesSindicales = async() => {
    try {
        const secciones = await instance.get('/union-section/');
        return secciones.data;
    } catch (error) {
        throw error;
    }
}