import instance from "../utils/axios"

export const GetInitial_states = async() => {
    try {
        const initial_states = await instance.get('/initial-state/');
        return initial_states.data
    } catch (error) {
        throw error;
    }
}

export const CreateInitial_state = async(name) => {
    try {
        const initial_state = await instance.post('/initial-state/', name);
        return initial_state;
    } catch (error) {
        throw error;
    }
}

export const DeleteInitial_state = async(id) => {
    try {
        const initial_state = await instance.delete(`/initial-state/${id}/`);
        return initial_state;
    } catch (error) {
        throw error;
    }
}

export const GetInitial_stateById = async(id) => {
    try {
        const initial_state = await instance.get(`/initial-state/${id}/`);
        return initial_state;
    } catch (error) {
        throw error;
    }
}

export const EditInitial_state = async(id, total_number_workers, total_number_affiliates, gross_potential, net_potential, accumulated_ten_percent, fully_committed, amount, year) => {
    try {
        const initial_state = await instance.put(`/initial-state/${id}/`, {id, total_number_workers, total_number_affiliates, gross_potential, net_potential, accumulated_ten_percent, fully_committed, amount, year});
        return initial_state;
    } catch (error) {
        throw error;
    }
}

export const GetInitial_statesByPage = async(page) => {
    try {
        const initial_states = await instance.get(`/initial-state/?page=${page}`);
        return initial_states;
    } catch (error) {
        throw error;
    }
}