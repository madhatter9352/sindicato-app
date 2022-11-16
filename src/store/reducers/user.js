import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Register } from "../../services/auth";
import { DeleteUser, EditUser, GetUsersByPage } from "../../services/user";

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

export const createUser = createAsyncThunk(
    'createUser',
    async(values, {rejectWithValue}) => {
        try {
            const register = await Register(values);
            return register;
        } catch (error) {
            return rejectWithValue(error.response.status === 400 ? error.response.data : null);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'deleteUser', 
    async(id, {rejectWithValue}) => {
        try {
            const user = await DeleteUser(id);
            if(user.status === 204){
                return id;
            }
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
);

export const editUser = createAsyncThunk(
    'editUser', 
    async({id, values}, {rejectWithValue}) => {
        try {
            const user = await EditUser(id, values)
            return user.data;
        } catch (error) {
            return rejectWithValue(error.response.status === 400 ? error.response.data : null);
        }
    }
)

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
            state.users = action.payload.data.results;
            state.loading = action.meta.requestStatus;
            state.pagination = {
                count: action.payload.data.count,
                next: !!action.payload.data.next,
                previous: !!action.payload.data.previous
            }
        });
        builder.addCase(getUsers.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createUser.fulfilled, (state, action) => {
            state.users.push(action.payload.data);
            state.loading = action.meta.requestStatus;
        })

        builder.addCase(createUser.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(createUser.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteUser.fulfilled, (state, action) => {
            const index = state.users.findIndex(a => a.id === action.payload);
            state.users.splice(index, 1);
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteUser.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(deleteUser.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editUser.fulfilled, (state, action) => {
            const index = state.users.findIndex(area => area.id === action.payload.id);
            state.users[index] = action.payload;
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editUser.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(editUser.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
        });
    }
});

export default userSlice.reducer;