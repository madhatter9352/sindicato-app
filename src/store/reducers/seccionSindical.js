import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetSeccionesSindicales } from "../../services/seccionSindical";

export const getSeccionesSindicales = createAsyncThunk(
    'getSeccionesSindicales',
    async (_, {rejectWithValue}) => {
        try {
            const secciones = await GetSeccionesSindicales();
            return secciones;
        } catch (error) {
            return rejectWithValue(error.response.statusText)
        }
    }
)

const seccionSindicalSlice = createSlice({
    name: 'seccionSindical',
    initialState: {
        seccionesSindicales: [],
        loading: 'idle',
        error: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getSeccionesSindicales.fulfilled, (state, action) => {
            state.seccionesSindicales = action.payload.results;
            state.loading = action.meta.requestStatus;
        });
        builder.addCase(getSeccionesSindicales.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });
        builder.addCase(getSeccionesSindicales.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });
    }
});

export default seccionSindicalSlice.reducer;