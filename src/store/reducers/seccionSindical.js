import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateSeccionSindical, DeleteSeccion, GetSeccionesByPage, GetSeccionesSindicales, UpdateSeccionSindical } from "../../services/seccionSindical";

export const getSeccionesSindicales = createAsyncThunk(
    'getSeccionesSindicales',
    async (_, {rejectWithValue}) => {
        try {
            const secciones = await GetSeccionesSindicales();
            return secciones;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
);

export const createSeccionSindical = createAsyncThunk(
    'createSeccionSindical',
    async (values, {rejectWithValue}) => {
        try {
            const secciones = await CreateSeccionSindical(values);
            console.log(secciones)
            return secciones.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
);

export const updateSeccion = createAsyncThunk(
    'updateSeccion',
    async({id, name, area}, {rejectWithValue}) => {
        try {
            const seccion = await UpdateSeccionSindical(id, name, area);
            return seccion.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
);

export const deleteSeccion = createAsyncThunk(
    'deleteSeccion',
    async(id, {rejectWithValue}) => {
        try {
            const seccion = await DeleteSeccion(id)
            if(seccion.status === 204){
                return id;
            }
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const getSeccionesByPage = createAsyncThunk(
    'getSeccionesByPage',
    async(page, {rejectWithValue}) => {
        try {
            const secciones = await GetSeccionesByPage(page);
            console.log(secciones);
            return secciones;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

const seccionSindicalSlice = createSlice({
    name: 'seccionSindical',
    initialState: {
        seccionesSindicales: [],
        loading: 'idle',
        error: '',
        pagination: null
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

        builder.addCase(createSeccionSindical.fulfilled, (state, action) => {
            state.seccionesSindicales.push(action.payload);
            state.loading = action.meta.requestStatus;
        });
        builder.addCase(createSeccionSindical.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });
        builder.addCase(createSeccionSindical.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(updateSeccion.fulfilled, (state, action) => {
            const index = state.seccionesSindicales.findIndex(seccion => seccion.id === action.payload.id);
            state.seccionesSindicales[index] = action.payload;
            state.loading = action.meta.requestStatus;
        });
        builder.addCase(updateSeccion.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });
        builder.addCase(updateSeccion.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteSeccion.fulfilled, (state, action) => {
            const index = state.seccionesSindicales.findIndex(a => a.id === action.payload);
            state.seccionesSindicales.splice(index, 1);
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteSeccion.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteSeccion.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getSeccionesByPage.fulfilled, (state, action) => {
            state.seccionesSindicales = action.payload.results;
            state.loading = action.meta.requestStatus;
            state.pagination = {
                count: action.payload.count,
                next: !!action.payload.next,
                previous: !!action.payload.previous
            }
        });

        builder.addCase(getSeccionesByPage.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getSeccionesByPage.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });


    }
});

export default seccionSindicalSlice.reducer;