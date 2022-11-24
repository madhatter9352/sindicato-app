import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateInitial_state, DeleteInitial_state, EditInitial_state, GetInitial_states, GetInitial_statesByPage } from "../../services/initial_state";
import moment from "moment/moment";

export const getInitial_states = createAsyncThunk(
    'getInitial_states',
    async (_, {rejectWithValue}) => {
        try {
            const initial_states = await GetInitial_states();
            return initial_states;
        } catch (error) {
            return rejectWithValue(error.response.statusText)
        }
    }
)

export const createInitial_state = createAsyncThunk(
    'createInitial_state',
    async(name, {rejectWithValue}) => {
        try {
            const initial_state = await CreateInitial_state(name)
            return initial_state.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const deleteInitial_state = createAsyncThunk(
    'deleteInitial_state',
    async(id, {rejectWithValue}) => {
        try {
            const initial_state = await DeleteInitial_state(id)
            if(initial_state.status === 204){
                return id;
            }
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const editInitial_state = createAsyncThunk(
    'editInitial_state',
    async({id, total_number_workers, total_number_affiliates, gross_potential, net_potential, accumulated_ten_percent, fully_committed, amount, year, name}, {rejectWithValue}) => {
        try {
            const initial_state = await EditInitial_state(id, total_number_workers, total_number_affiliates, gross_potential, net_potential, accumulated_ten_percent, fully_committed, amount, year, name)
            return initial_state.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

export const getInitial_statesByPage = createAsyncThunk(
    'getInitial_statesByPage',
    async(page, {rejectWithValue}) => {
        try {
            const initial_state = await GetInitial_statesByPage(page)
            return initial_state.data;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

const initial_stateSlice = createSlice({
    name: 'initial_state',
    initialState: {
        initial_states: [],
        loading: 'idle',
        error: '',
        pagination: null
    },
    reducers: {
        clearInitial_stateState(state, action){
            state.initial_states = [];
            state.loading = 'idle';
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getInitial_states.fulfilled, (state, action) => {
            state.initial_states = action.payload.results;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getInitial_states.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getInitial_states.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createInitial_state.fulfilled, (state, action) => {
            state.initial_states.push(action.payload)
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createInitial_state.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createInitial_state.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteInitial_state.fulfilled, (state, action) => {
            const index = state.initial_states.findIndex(a => a.id === action.payload);
            state.initial_states.splice(index, 1);
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteInitial_state.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteInitial_state.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editInitial_state.fulfilled, (state, action) => {
            const index = state.initial_states.findIndex(initial_state => initial_state.id === action.payload.id);
            state.initial_states[index] = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editInitial_state.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editInitial_state.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getInitial_statesByPage.fulfilled, (state, action) => {
            state.initial_states = action.payload.results;
            state.loading = action.meta.requestStatus;
            state.pagination = {
                count: action.payload.count,
                next: !!action.payload.next,
                previous: !!action.payload.previous
            }
        });

        builder.addCase(getInitial_statesByPage.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(getInitial_statesByPage.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });
    }
});

export const {clearInitial_stateState} = initial_stateSlice.actions;

export default initial_stateSlice.reducer;