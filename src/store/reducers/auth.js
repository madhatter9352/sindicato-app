import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { history } from "../../App";
import {Login, Logout, Register} from "../../services/auth";

export const login = createAsyncThunk(
    'login',
    async (params, {rejectWithValue, dispatch}) => {
        try {
            dispatch(clearError());
            const login = await Login(params)
            const data = login.data
            localStorage.setItem('access_token', data['access_token'])
            localStorage.setItem('refresh_token', data['refresh_token'])
            localStorage.setItem('user', JSON.stringify(data['user']))
            toast.success('Login correcto', {
                theme: 'colored'
            });
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

export const register = createAsyncThunk(
    'register',
    async(values, {rejectWithValue}) => {
        try {
            const register = await Register(values);
            toast.success('Registrado correctamente', {
                theme: 'colored'
            });
            return register;
        } catch (error) {
            return rejectWithValue(error.response.status === 400 ? error.response.data : null);
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
    reducers: {
        clearError(state, action){
            state.error= null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user
            history.push('/');
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
            //window.location.href = '/'
            history.push('/login');
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
            //window.location.href = '/'
            history.push('/login');
        });

        builder.addCase(register.fulfilled, (state, action) => {
            window.location.href = '/login';
        });

        builder.addCase(register.pending, (state, action) => {
            state.error = null
            state.loading = action.meta.requestStatus;
        });

        builder.addCase(register.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = action.meta.requestStatus;
            state.isAuthenticated = false
        });
    }
});

export const {clearError} = authSlice.actions;

export default authSlice.reducer;