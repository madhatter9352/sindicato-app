import instance from "../utils/axios"

export const GetDonations = async() => {
    try {
        const donations = await instance.get('/donation/');
        return donations.data
    } catch (error) {
        throw error;
    }
}

export const CreateDonation = async(name) => {
    try {
        const donation = await instance.post('/donation/', name);
        return donation;
    } catch (error) {
        throw error;
    }
}

export const DeleteDonation = async(id) => {
    try {
        const donation = await instance.delete(`/donation/${id}/`);
        return donation;
    } catch (error) {
        throw error;
    }
}

export const GetDonationById = async(id) => {
    try {
        const donation = await instance.get(`/donation/${id}/`);
        return donation;
    } catch (error) {
        throw error;
    }
}

export const EditDonation = async(id, name, area, date) => {
    try {
        const donation = await instance.put(`/donation/${id}/`, {name, area, date});
        return donation;
    } catch (error) {
        throw error;
    }
}

export const GetDonationsByPage = async(page) => {
    try {
        const donations = await instance.get(`/donation/?page=${page}`);
        return donations;
    } catch (error) {
        throw error;
    }
}