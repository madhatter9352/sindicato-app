import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetUsersByPage } from "../../services/user";

export const getUsers = createAsyncThunk(
    'getUsers',
    async (page, {rejectWithValue}) => {
        try {
            const users = await GetUsersByPage(page);
            return users;
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        loading: 'idle',
        error: '',
        pagination: null
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload.results;
            state.loading = action.meta.requestStatus;
            state.pagination = {
                count: action.payload.count,
                next: !!action.payload.next,
                previous: !!action.payload.previous
            }
        });
        builder.addCase(getUsers.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });
    }
});

export default userSlice.reducer;