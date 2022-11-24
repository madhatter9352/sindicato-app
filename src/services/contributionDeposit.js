import instance from "../utils/axios"

export const GetContributionDeposits = async() => {
    try {
        const contributionDeposits = await instance.get('/contribution-deposit/');
        return contributionDeposits.data
    } catch (error) {
        throw error;
    }
}

export const CreateContributionDeposit = async(name) => {
    try {
        const contributionDeposit = await instance.post('/contribution-deposit/', name);
        return contributionDeposit;
    } catch (error) {
        throw error;
    }
}

export const DeleteContributionDeposit = async(id) => {
    try {
        const contributionDeposit = await instance.delete(`/contribution-deposit/${id}/`);
        return contributionDeposit;
    } catch (error) {
        throw error;
    }
}

export const GetContributionDepositById = async(id) => {
    try {
        const contributionDeposit = await instance.get(`/contribution-deposit/${id}/`);
        return contributionDeposit;
    } catch (error) {
        throw error;
    }
}

export const EditContributionDeposit = async(id, union_section_id, total_number_workers, total_number_committed, to_deposit, deposited, high, low, earring) => {
    try {
        const contributionDeposit = await instance.put(`/contribution-deposit/${id}/`, {union_section_id, total_number_workers, total_number_committed, to_deposit, deposited, high, low, earring});
        return contributionDeposit;
    } catch (error) {
        throw error;
    }
}

export const GetContributionDepositsByPage = async(page) => {
    try {
        const contributionDeposits = await instance.get(`/contribution-deposit/?page=${page}`);
        return contributionDeposits;
    } catch (error) {
        throw error;
    }
}