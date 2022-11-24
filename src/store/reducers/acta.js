import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateActa, DeleteActa, GetActasByPage } from "../../services/acta";

export const getActasByPage = createAsyncThunk(
    'getActasByPage',
    async(page, {rejectWithValue}) => {
        try {
            const actas = await GetActasByPage(page);
            return actas.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const createActa = createAsyncThunk(
    'createActa',
    async(values, {rejectWithValue}) => {
        try {
            values.initial_state_id = 1
            values.type = 'test'
            const acta = await CreateActa(values)
            return acta;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const deleteActaReducer = createAsyncThunk(
    'deleteActaReducer',
    async(id, {rejectWithValue}) => {
        try {
            const acta = await DeleteActa(id)
            if(acta.status === 204){
                return id;
            }
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)


const actaSlice = createSlice({
    name: 'acta',
    initialState: {
        actas: [],
        loading: 'idle',
        error: '',
        pagination: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getActasByPage.fulfilled, (state, action) => {
            state.actas = action.payload.results;
            state.loading = action.meta.requestStatus;
            state.pagination = {
                count: action.payload.count,
                next: !!action.payload.next,
                previous: !!action.payload.previous
            }
        });

        builder.addCase(getActasByPage.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getActasByPage.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createActa.fulfilled, (state, action) => {
            state.actas.push(action.payload);
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createActa.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createActa.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteActaReducer.fulfilled, (state, action) => {
            console.log(action)
            const index = state.actas.findIndex(a => a.id === action.payload);
            state.actas.splice(index, 1);
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteActaReducer.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteActaReducer.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });
    }
});

export default actaSlice.reducer;