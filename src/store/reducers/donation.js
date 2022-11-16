import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateDonation, DeleteDonation, EditDonation, GetDonations, GetDonationsByPage } from "../../services/donation";

export const getDonations = createAsyncThunk(
    'getDonations',
    async (_, {rejectWithValue}) => {
        try {
            const donations = await GetDonations();
            return donations;
        } catch (error) {
            return rejectWithValue(error.response.statusText)
        }
    }
)

export const createDonation = createAsyncThunk(
    'createDonation',
    async(name, {rejectWithValue}) => {
        try {
            const donation = await CreateDonation(name)
            return donation.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const deleteDonation = createAsyncThunk(
    'deleteDonation',
    async(id, {rejectWithValue}) => {
        try {
            const donation = await DeleteDonation(id)
            if(donation.status === 204){
                return id;
            }
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const editDonation = createAsyncThunk(
    'editDonation',
    async({id, name, area, date}, {rejectWithValue}) => {
        try {
            const donation = await EditDonation(id, name, area, date)
            return donation.data;
        } catch (error) {
            console.log(error.response.statusText)
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const getDonationsByPage = createAsyncThunk(
    'getDonationsByPage',
    async(page, {rejectWithValue}) => {
        try {
            const donation = await GetDonationsByPage(page)
            console.log(donation);
            return donation.data;
        } catch (error) {
            console.log(error.response.statusText)
            return rejectWithValue(error.response.statusText);
        }
    }
)

const donationSlice = createSlice({
    name: 'donation',
    initialState: {
        donations: [],
        loading: 'idle',
        error: '',
        pagination: null
    },
    reducers: {
        clearDonationState(state, action){
            state.donations = [];
            state.loading = 'idle';
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDonations.fulfilled, (state, action) => {
            state.donations = action.payload.results;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getDonations.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getDonations.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createDonation.fulfilled, (state, action) => {
            state.donations.push(action.payload)
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createDonation.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createDonation.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteDonation.fulfilled, (state, action) => {
            const index = state.donations.findIndex(a => a.id === action.payload);
            state.donations.splice(index, 1);
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteDonation.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteDonation.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editDonation.fulfilled, (state, action) => {
            const index = state.donations.findIndex(donation => donation.id === action.payload.id);
            state.donations[index] = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editDonation.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editDonation.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getDonationsByPage.fulfilled, (state, action) => {
            console.log(action)
            state.donations = action.payload.results;
            state.loading = action.meta.requestStatus;
            state.pagination = {
                count: action.payload.count,
                next: !!action.payload.next,
                previous: !!action.payload.previous
            }
        });

        builder.addCase(getDonationsByPage.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getDonationsByPage.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });
    }
});

export const {clearDonationState} = donationSlice.actions;

export default donationSlice.reducer;