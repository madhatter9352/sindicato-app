import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateArea, DeleteArea, EditArea, GetAreas, GetAreasByPage } from "../../services/area";

export const getAreas = createAsyncThunk(
    'getAreas',
    async (_, {rejectWithValue}) => {
        try {
            const areas = await GetAreas();
            return areas;
        } catch (error) {
            return rejectWithValue(error.response.statusText)
        }
    }
)

export const createArea = createAsyncThunk(
    'createArea',
    async(name, {rejectWithValue}) => {
        try {
            const area = await CreateArea(name)
            return area.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const deleteArea = createAsyncThunk(
    'deleteArea',
    async(id, {rejectWithValue}) => {
        try {
            const area = await DeleteArea(id)
            if(area.status === 204){
                return id;
            }
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const editArea = createAsyncThunk(
    'editArea',
    async({id, name}, {rejectWithValue}) => {
        try {
            const area = await EditArea(id, name)
            return area.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const getAreasByPage = createAsyncThunk(
    'getAreasByPage',
    async(page, {rejectWithValue}) => {
        try {
            const area = await GetAreasByPage(page)
            return area.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

const areaSlice = createSlice({
    name: 'area',
    initialState: {
        areas: [],
        loading: 'idle',
        error: '',
        pagination: null
    },
    reducers: {
        clearAreaState(state, action){
            state.areas = [];
            state.loading = 'idle';
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAreas.fulfilled, (state, action) => {
            state.areas = action.payload.results;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getAreas.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getAreas.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createArea.fulfilled, (state, action) => {
            state.areas.push(action.payload)
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createArea.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createArea.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteArea.fulfilled, (state, action) => {
            const index = state.areas.findIndex(a => a.id === action.payload);
            state.areas.splice(index, 1);
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteArea.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteArea.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editArea.fulfilled, (state, action) => {
            const index = state.areas.findIndex(area => area.id === action.payload.id);
            state.areas[index] = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editArea.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editArea.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getAreasByPage.fulfilled, (state, action) => {
            state.areas = action.payload.results;
            state.loading = action.meta.requestStatus;
            state.pagination = {
                count: action.payload.count,
                next: !!action.payload.next,
                previous: !!action.payload.previous
            }
        });

        builder.addCase(getAreasByPage.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getAreasByPage.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });
    }
});

export const {clearAreaState} = areaSlice.actions;

export default areaSlice.reducer;