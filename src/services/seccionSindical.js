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
            area_id: values.area,
            //TODO: Revisar que se va a hacer con este valor
            initial_state: 1
        };

        const seccion = await instance.post('/union-section/', payload);
        console.log(seccion);
        return seccion;
    } catch (error) {
        throw error;
    }
}