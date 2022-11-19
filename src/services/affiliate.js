import instance from "../utils/axios"

export const GetAffiliates = async() => {
    try {
        const affiliates = await instance.get('/affiliate/');
        return affiliates.data
    } catch (error) {
        throw error;
    }
}

export const CreateAffiliate = async(name) => {
    try {
        const affiliate = await instance.post('/affiliate/', name);
        return affiliate;
    } catch (error) {
        throw error;
    }
}

export const DeleteAffiliate = async(id) => {
    try {
        const affiliate = await instance.delete(`/affiliate/${id}/`);
        return affiliate;
    } catch (error) {
        throw error;
    }
}

export const GetAffiliateById = async(id) => {
    try {
        const affiliate = await instance.get(`/affiliate/${id}/`);
        return affiliate;
    } catch (error) {
        throw error;
    }
}

export const EditAffiliate = async(id, name, high_date, low_date, initial_state, salary, monthly_quota, annual_quota, contribution_commitment, month_contribution) => {
    try {
        const affiliate = await instance.put(`/affiliate/${id}/`, {name, high_date, low_date, initial_state, salary, monthly_quota, annual_quota, contribution_commitment, month_contribution});
        return affiliate;
    } catch (error) {
        throw error;
    }
}

export const GetAffiliatesByPage = async(page) => {
    try {
        const affiliates = await instance.get(`/affiliate/?page=${page}`);
        return affiliates;
    } catch (error) {
        throw error;
    }
}