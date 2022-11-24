import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateUnion_section, DeleteUnion_section, EditUnion_section, GetUnion_sections, GetUnion_sectionsByPage } from "../../services/unionSection";

export const getUnion_sections = createAsyncThunk(
    'getUnion_sections',
    async (_, {rejectWithValue}) => {
        try {
            const union_sections = await GetUnion_sections();
            return union_sections;
        } catch (error) {
            return rejectWithValue(error.response.statusText)
        }
    }
)

export const createUnion_section = createAsyncThunk(
    'createUnion_section',
    async(name, {rejectWithValue}) => {
        try {
            const union_section = await CreateUnion_section(name)
            return union_section.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const deleteUnion_section = createAsyncThunk(
    'deleteUnion_section',
    async(id, {rejectWithValue}) => {
        try {
            const union_section = await DeleteUnion_section(id)
            if(union_section.status === 204){
                return id;
            }
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const editUnion_section = createAsyncThunk(
    'editUnion_section',
    async({id, name, area, initial_state}, {rejectWithValue}) => {
        try {
            const union_section = await EditUnion_section(id, name, area, initial_state)
            return union_section.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const getUnion_sectionsByPage = createAsyncThunk(
    'getUnion_sectionsByPage',
    async(page, {rejectWithValue}) => {
        try {
            const union_section = await GetUnion_sectionsByPage(page)
            return union_section.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

const union_sectionSlice = createSlice({
    name: 'union_section',
    initialState: {
        union_sections: [],
        loading: 'idle',
        error: '',
        pagination: null
    },
    reducers: {
        clearUnion_sectionState(state, action){
            state.union_sections = [];
            state.loading = 'idle';
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUnion_sections.fulfilled, (state, action) => {
            state.union_sections = action.payload.results;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getUnion_sections.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getUnion_sections.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createUnion_section.fulfilled, (state, action) => {
            state.union_sections.push(action.payload)
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createUnion_section.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createUnion_section.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteUnion_section.fulfilled, (state, action) => {
            const index = state.union_sections.findIndex(a => a.id === action.payload);
            state.union_sections.splice(index, 1);
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteUnion_section.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteUnion_section.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editUnion_section.fulfilled, (state, action) => {
            const index = state.union_sections.findIndex(union_section => union_section.id === action.payload.id);
            state.union_sections[index] = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editUnion_section.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editUnion_section.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getUnion_sectionsByPage.fulfilled, (state, action) => {
            state.union_sections = action.payload.results;
            state.loading = action.meta.requestStatus;
            state.pagination = {
                count: action.payload.count,
                next: !!action.payload.next,
                previous: !!action.payload.previous
            }
        });

        builder.addCase(getUnion_sectionsByPage.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getUnion_sectionsByPage.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });
    }
});

export const {clearUnion_sectionState} = union_sectionSlice.actions;

export default union_sectionSlice.reducer;