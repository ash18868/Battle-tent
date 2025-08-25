import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../lib/api' // Calls our interceptor


const tokenKey = 'bt_token'


export const registerUser = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
    try {
        const { data } = await api.post('/auth/register', payload)
        return data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed')
    }
})


export const loginUser = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
    try {
        const { data } = await api.post('/auth/login', payload)
        return data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed')
    }
})


export const fetchMe = createAsyncThunk('auth/me', async (_, thunkAPI) => {
    try {
        const { data } = await api.get('/auth/me')
        return data
    } catch (err) {
        return thunkAPI.rejectWithValue('Could not fetch user')
    }
})


const initialState = {
    user: null,
    token: localStorage.getItem(tokenKey) || null,
    status: 'idle',
    error: null
}


const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Logout clears state
        logout(state) {
        state.user = null
        state.token = null
        localStorage.removeItem(tokenKey)
        }
    },
    extraReducers: (builder) => {
        const fulfill = (state, action) => {
            state.status = 'succeeded'
            if (action.payload.token) { // if payload.token exists we set token
                state.token = action.payload.token
                localStorage.setItem(tokenKey, action.payload.token)
            }
            state.user = action.payload.user
            state.error = null
        }
        const pending = (state) => { state.status = 'loading'; state.error = null }
        const rejected = (state, action) => { state.status = 'failed'; state.error = action.payload || 'Error' }


        builder
            .addCase(registerUser.pending, pending)
            .addCase(registerUser.fulfilled, fulfill)
            .addCase(registerUser.rejected, rejected)
            .addCase(loginUser.pending, pending)
            .addCase(loginUser.fulfilled, fulfill)
            .addCase(loginUser.rejected, rejected)
            .addCase(fetchMe.pending, pending)
            .addCase(fetchMe.fulfilled, (state, action) => { state.status = 'succeeded'; state.user = action.payload.user })
            .addCase(fetchMe.rejected, rejected)
    }
})


export const { logout } = slice.actions
export default slice.reducer