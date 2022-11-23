import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateAffiliate, DeleteAffiliate, EditAffiliate, GetAffiliates, GetAffiliatesByPage } from "../../services/affiliate";

export const getAffiliates = createAsyncThunk(
    'getAffiliates',
    async (_, {rejectWithValue}) => {
        try {
            const affiliates = await GetAffiliates();
            return affiliates;
        } catch (error) {
            return rejectWithValue(error.response.statusText)
        }
    }
)

export const createAffiliate = createAsyncThunk(
    'createAffiliate',
    async(name, {rejectWithValue}) => {
        try {
            const affiliate = await CreateAffiliate(name)
            return affiliate.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const deleteAffiliate = createAsyncThunk(
    'deleteAffiliate',
    async(id, {rejectWithValue}) => {
        try {
            const affiliate = await DeleteAffiliate(id)
            if(affiliate.status === 204){
                return id;
            }
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const editAffiliate = createAsyncThunk(
    'editAffiliate',
    async({id, name, high_date, low_date, initial_state_id, salary, monthly_quota, annual_quota, contribution_commitment, month_contribution }, {rejectWithValue}) => {
        try {
            const affiliate = await EditAffiliate(id, name, high_date, low_date, initial_state_id, salary, monthly_quota, annual_quota, contribution_commitment, month_contribution)
            return affiliate.data;
        } catch (error) {
            console.log(error.response.statusText)
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const getAffiliatesByPage = createAsyncThunk(
    'getAffiliatesByPage',
    async(page, {rejectWithValue}) => {
        try {
            const affiliate = await GetAffiliatesByPage(page)
            console.log(affiliate);
            return affiliate.data;
        } catch (error) {
            console.log(error.response.statusText)
            return rejectWithValue(error.response.statusText);
        }
    }
)

const affiliateSlice = createSlice({
    name: 'affiliate',
    initialState: {
        affiliates: [],
        loading: 'idle',
        error: '',
        pagination: null
    },
    reducers: {
        clearAffiliateState(state, action){
            state.affiliates = [];
            state.loading = 'idle';
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAffiliates.fulfilled, (state, action) => {
            state.affiliates = action.payload.results;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getAffiliates.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getAffiliates.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createAffiliate.fulfilled, (state, action) => {
            state.affiliates.push(action.payload)
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createAffiliate.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createAffiliate.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteAffiliate.fulfilled, (state, action) => {
            const index = state.affiliates.findIndex(a => a.id === action.payload);
            state.affiliates.splice(index, 1);
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteAffiliate.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteAffiliate.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editAffiliate.fulfilled, (state, action) => {
            const index = state.affiliates.findIndex(affiliate => affiliate.id === action.payload.id);
            state.affiliates[index] = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editAffiliate.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editAffiliate.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getAffiliatesByPage.fulfilled, (state, action) => {
            console.log(action)
            state.affiliates = action.payload.results;
            state.loading = action.meta.requestStatus;
            state.pagination = {
                count: action.payload.count,
                next: !!action.payload.next,
                previous: !!action.payload.previous
            }
        });

        builder.addCase(getAffiliatesByPage.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getAffiliatesByPage.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });
    }
});

export const {clearAffiliateState} = affiliateSlice.actions;

export default affiliateSlice.reducer;