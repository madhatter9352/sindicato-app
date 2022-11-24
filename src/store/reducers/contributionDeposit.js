import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateContributionDeposit, DeleteContributionDeposit, EditContributionDeposit, GetContributionDeposits, GetContributionDepositsByPage } from "../../services/contributionDeposit";

export const getContributionDeposits = createAsyncThunk(
    'getContributionDeposits',
    async (_, {rejectWithValue}) => {
        try {
            const contributionDeposits = await GetContributionDeposits();
            return contributionDeposits;
        } catch (error) {
            return rejectWithValue(error.response.statusText)
        }
    }
)

export const createContributionDeposit = createAsyncThunk(
    'createContributionDeposit',
    async(name, {rejectWithValue}) => {
        try {
            const contributionDeposit = await CreateContributionDeposit(name)
            return contributionDeposit.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const deleteContributionDeposit = createAsyncThunk(
    'deleteContributionDeposit',
    async(id, {rejectWithValue}) => {
        try {
            const contributionDeposit = await DeleteContributionDeposit(id)
            if(contributionDeposit.status === 204){
                return id;
            }
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const editContributionDeposit = createAsyncThunk(
    'editContributionDeposit',
    async({id, union_section_id, total_number_workers, total_number_committed, to_deposit, deposited, high, low, earring }, {rejectWithValue}) => {
        try {
            const contributionDeposit = await EditContributionDeposit(id, union_section_id, total_number_workers, total_number_committed, to_deposit, deposited, high, low, earring)
            return contributionDeposit.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const getContributionDepositsByPage = createAsyncThunk(
    'getContributionDepositsByPage',
    async(page, {rejectWithValue}) => {
        try {
            const contributionDeposit = await GetContributionDepositsByPage(page)
            return contributionDeposit.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

const contributionDepositSlice = createSlice({
    name: 'contributionDeposit',
    initialState: {
        contributionDeposits: [],
        loading: 'idle',
        error: '',
        pagination: null
    },
    reducers: {
        clearContributionDepositState(state, action){
            state.contributionDeposits = [];
            state.loading = 'idle';
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getContributionDeposits.fulfilled, (state, action) => {
            state.contributionDeposits = action.payload.results;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getContributionDeposits.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getContributionDeposits.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createContributionDeposit.fulfilled, (state, action) => {
            state.contributionDeposits.push(action.payload)
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createContributionDeposit.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createContributionDeposit.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteContributionDeposit.fulfilled, (state, action) => {
            const index = state.contributionDeposits.findIndex(a => a.id === action.payload);
            state.contributionDeposits.splice(index, 1);
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteContributionDeposit.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteContributionDeposit.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editContributionDeposit.fulfilled, (state, action) => {
            const index = state.contributionDeposits.findIndex(contributionDeposit => contributionDeposit.id === action.payload.id);
            state.contributionDeposits[index] = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editContributionDeposit.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editContributionDeposit.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getContributionDepositsByPage.fulfilled, (state, action) => {
            state.contributionDeposits = action.payload.results;
            state.loading = action.meta.requestStatus;
            state.pagination = {
                count: action.payload.count,
                next: !!action.payload.next,
                previous: !!action.payload.previous
            }
        });

        builder.addCase(getContributionDepositsByPage.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getContributionDepositsByPage.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });
    }
});

export const {clearContributionDepositState} = contributionDepositSlice.actions;

export default contributionDepositSlice.reducer;