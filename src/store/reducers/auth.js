import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Login, Logout} from "../../services/auth";

export const login = createAsyncThunk(
    'login',
    async (params, {rejectWithValue}) => {
        try {
            const login = await Login(params)
            const data = login.data
            localStorage.setItem('access_token', data['access_token'])
            localStorage.setItem('refresh_token', data['refresh_token'])
            localStorage.setItem('user', JSON.stringify(data['user']))
            return data
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)
export const logout = createAsyncThunk(
    'logout',
    async (params, {rejectWithValue}) => {
        try {
            const logout =  await Logout(params)
            localStorage.clear()
            return logout
        } catch (error) {
            return rejectWithValue(error.response.statusText);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: !!localStorage.getItem('access_token'),
        loading: 'idle',
        error: null,
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            window.location.href = '/'
        });

        builder.addCase(login.pending, (state, action) => {
            state.error = null
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(login.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
            state.isAuthenticated = false
        });

        builder.addCase(logout.fulfilled, (state, action) => {
            state.error = null;
            state.loading = 'idle';
            state.isAuthenticated = false
            state.user = null
            window.location.href = '/'
        });

        builder.addCase(logout.pending, (state, action) => {
            state.error = null
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(logout.rejected, (state, action) => {
            state.error = null;
            state.loading = 'idle';
            state.isAuthenticated = false
            state.user = null
            window.location.href = '/'
        });
    }
});

export default authSlice.reducer;