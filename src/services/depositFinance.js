import instance from "../utils/axios"

export const GetDepositFinances = async() => {
    try {
        const depositFinances = await instance.get('/deposit-finance/');
        return depositFinances.data
    } catch (error) {
        throw error;
    }
}

export const CreateDepositFinance = async(name) => {
    try {
        const depositFinance = await instance.post('/deposit-finance/', name);
        return depositFinance;
    } catch (error) {
        throw error;
    }
}

export const DeleteDepositFinance = async(id) => {
    try {
        const depositFinance = await instance.delete(`/deposit-finance/${id}/`);
        return depositFinance;
    } catch (error) {
        throw error;
    }
}

export const GetDepositFinanceById = async(id) => {
    try {
        const depositFinance = await instance.get(`/deposit-finance/${id}/`);
        return depositFinance;
    } catch (error) {
        throw error;
    }
}

export const EditDepositFinance = async(id, union_section_id, date, total_number_workers, total_number_affiliates, al_da, unlisted, with_arrears, liquidated_year, high, low, to_quote, quoted, earring, ten_percent, net_quoted, ten_percent_accumulated, reduction, total_balance) => {
    try {
        const depositFinance = await instance.put(`/deposit-finance/${id}/`, {union_section_id, date, total_number_workers, total_number_affiliates, al_da, unlisted, with_arrears, liquidated_year, high, low, to_quote, quoted, earring, ten_percent, net_quoted, ten_percent_accumulated, reduction, total_balance});
        return depositFinance;
    } catch (error) {
        throw error;
    }
}

export const GetDepositFinancesByPage = async(page) => {
    try {
        const depositFinances = await instance.get(`/deposit-finance/?page=${page}`);
        return depositFinances;
    } catch (error) {
        throw error;
    }
}