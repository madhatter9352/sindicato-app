import instance from "../utils/axios";

export const CreateActa = async(values) => {
    try {
        const acta = await instance.post('/act/', values);
        return acta.data
    } catch (error) {
        throw error;
    }
}

export const GetActasByPage = async(page) => {
    try {
        const actas = await instance.get(`/act/?page=${page}`);
        return actas;
    } catch (error) {
        throw error;
    }
}

export const GetActaById = async(id) => {
    try {
        const acta = await instance.get(`/act/${id}`);
        return acta
    } catch (error) {
        throw error;
    }
}

export const GetAcuerdosByActaId = async(id) => {
    console.log(id)
    try {
        const acuerdos = await instance.get('/agreement/');
        return acuerdos.data.results.filter(acuerdo => acuerdo.act.id == id);
    } catch (error) {
        throw error;
    }
}

export const CreateAcuerdo = async(values) => {
    try {
        const acuerdo = await instance.post('/agreement/', values)
        return acuerdo;
    } catch (error) {
        throw error;
    }
}

export const DeleteAcuerdo = async(id) => {
    try {
        const resp = await instance.delete(`/agreement/${id}/`);
        return resp;
    } catch (error) {
        throw error;
    }
}

export const AddPointAct = async(values) => {
    try {
        const point = await instance.post('/point-act/', values);
        return point;
    } catch (error) {
        throw error;
    }
}

export const GetPuntosByActa = async(id) => {
    try {
        const points = await instance.get('/point-act/');
        console.log(points)
        return points.data.results.filter(point => point.act == id);
    } catch (error) {
        throw error;
    }
}

export const DeletePunto = async(id) => {
    try {
        const resp = await instance.delete(`/point-act/${id}`);
        return resp;
    } catch (error) {
        throw error;
    }
}

export const AddDocument = async(value) => {
    try {
        const document = await instance.post('/type-document-act/', value);
        return document;
    } catch (error) {
        throw error;
    }
}

export const GetDocumentosByActa = async(id) => {
    try {
        const documents = await instance.get('/type-document-act/')
        return documents.data.results.filter(doc => doc.act == id);
    } catch (error) {
        throw error;
    }
}

export const DeleteDocument = async(id) => {
    try {
        const resp = await instance.delete(`/type-document-act/${id}`);
        return resp;
    } catch (error) {
        throw error;
    }
}

export const CreatePlanteamiento = async(values) => {
    try {
        const planteamiento = await instance.post('/approach/', values);
        return planteamiento;
    } catch (error) {
        throw error;
    }
}

export const GetPlanteamientosByActa = async(id) => {
    try {
        const planteamientos = await instance.get('/approach/')
        console.log(planteamientos)
        return planteamientos.data.results.filter(planteamiento => planteamiento.act.id == id)
    } catch (error) {
        throw error;
    }
}

export const DeletePlanteamineto = async(id) => {
    try {
        const resp = await instance.delete(`/approach/${id}`)
        return resp
    } catch (error) {
        throw error;
    }
}

export const DeleteActa = async(id) => {
    try {
        const acta = await instance.delete(`/act/${id}`);
        return acta
    } catch (error) {
        throw error;
    }
}