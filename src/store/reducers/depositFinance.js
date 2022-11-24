import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateDepositFinance, DeleteDepositFinance, EditDepositFinance, GetDepositFinances, GetDepositFinancesByPage } from "../../services/depositFinance";

export const getDepositFinances = createAsyncThunk(
    'getDepositFinances',
    async (_, {rejectWithValue}) => {
        try {
            const depositFinances = await GetDepositFinances();
            return depositFinances;
        } catch (error) {
            return rejectWithValue(error.response.statusText)
        }
    }
)

export const createDepositFinance = createAsyncThunk(
    'createDepositFinance',
    async(name, {rejectWithValue}) => {
        try {
            const depositFinance = await CreateDepositFinance(name)
            return depositFinance.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const deleteDepositFinance = createAsyncThunk(
    'deleteDepositFinance',
    async(id, {rejectWithValue}) => {
        try {
            const depositFinance = await DeleteDepositFinance(id)
            if(depositFinance.status === 204){
                return id;
            }
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const editDepositFinance = createAsyncThunk(
    'editDepositFinance',
    async({id, union_section_id, date, total_number_workers, total_number_affiliates, al_da, unlisted, with_arrears, liquidated_year, high, low, to_quote, quoted, earring, ten_percent, net_quoted, ten_percent_accumulated, reduction, total_balance }, {rejectWithValue}) => {
        try {
            const depositFinance = await EditDepositFinance(id, union_section_id, date, total_number_workers, total_number_affiliates, al_da, unlisted, with_arrears, liquidated_year, high, low, to_quote, quoted, earring, ten_percent, net_quoted, ten_percent_accumulated, reduction, total_balance)
            return depositFinance.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const getDepositFinancesByPage = createAsyncThunk(
    'getDepositFinancesByPage',
    async(page, {rejectWithValue}) => {
        try {
            const depositFinance = await GetDepositFinancesByPage(page)
            return depositFinance.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

const depositFinanceSlice = createSlice({
    name: 'depositFinance',
    initialState: {
        depositFinances: [],
        loading: 'idle',
        error: '',
        pagination: null
    },
    reducers: {
        clearDepositFinanceState(state, action){
            state.depositFinances = [];
            state.loading = 'idle';
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDepositFinances.fulfilled, (state, action) => {
            state.depositFinances = action.payload.results;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getDepositFinances.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getDepositFinances.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createDepositFinance.fulfilled, (state, action) => {
            state.depositFinances.push(action.payload)
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createDepositFinance.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createDepositFinance.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteDepositFinance.fulfilled, (state, action) => {
            const index = state.depositFinances.findIndex(a => a.id === action.payload);
            state.depositFinances.splice(index, 1);
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteDepositFinance.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteDepositFinance.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editDepositFinance.fulfilled, (state, action) => {
            const index = state.depositFinances.findIndex(depositFinance => depositFinance.id === action.payload.id);
            state.depositFinances[index] = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editDepositFinance.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editDepositFinance.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getDepositFinancesByPage.fulfilled, (state, action) => {
            state.depositFinances = action.payload.results;
            state.loading = action.meta.requestStatus;
            state.pagination = {
                count: action.payload.count,
                next: !!action.payload.next,
                previous: !!action.payload.previous
            }
        });

        builder.addCase(getDepositFinancesByPage.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getDepositFinancesByPage.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });
    }
});

export const {clearDepositFinanceState} = depositFinanceSlice.actions;

export default depositFinanceSlice.reducer;