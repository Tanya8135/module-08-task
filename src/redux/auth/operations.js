import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://goit-task-manager.herokuapp.com/';

// Utility to add JSON Web Token - добавление
const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT - удаление
const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

/*
* POST @ /users/signup -- реєстреція користувача
* body: { name, email, password }
*/
export const register = createAsyncThunk(
    'auth/register',
    async (credentials, thunkAPI) => {
        try {
            const resp = await axios.post('users/signup', credentials);
            // After successful registation, add the token to the HTTP header
            // после успешной регистрации додается токен HTTP
            setAuthHeader(resp.data.token);
            return resp.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

/*
* POST @ /users/login -- вход пользователя
* body { email, password }
*/
export const logIn = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const resp = await axios.post('/users/login', credentials);
            // After successful login, add the token to the HTTP header
            // после успешного входа додается токен HTTP
            setAuthHeader(resp.data.token);
            return resp.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

/*
* POST @/users/logout 
* headers: Authorization: Bearer token
*/
export const logOut = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await axios.post('/users/logout');
            // After successful logout, remove the token from the HTTP header
            // после успешного выхода, удалить токен из HTTP
            clearAuthHeader();
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

// Авторизация (оновлення) (заново войти?)
/*
* GET @ /users/current
* headers: Authorization: Bearer token
*/
export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        // Reading the token from the state via getState()
        const state = thunkAPI.getState();
        const persistedToken = state.auth.token;

        if (persistedToken === null) {
            // If there is no token, exit without performing any request
            return thunkAPI.rejectWithValue('Unable to fetch user');
        }

        try {
            // If there is a token, add it to the HTTP header and perform the request
            setAuthHeader(persistedToken);
            const resp = await axios.get('/users/me');
            return resp.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);