import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET @ /tasks (связывает свойство объэкта с ф-ей, которая будет вызываться 
// при обращении к этому свойству)
export const fetchTasks = createAsyncThunk(
    'tasks/fetchAll',
    async (_, thunkAPI) => {
        try {
            const resp = await axios.get('/tasks');
            return resp.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

// POST @ /tasks (отправка данных на сервер)
export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (text, thunkAPI) => {
        try {
            const resp = await axios.post('/tasks', { text });
            return resp.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

//DELETE @ /tasks/:id (удаление по id)
export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId, thunkAPI) => {
        try {
            const resp = await axios.delete(`/tasks/${taskId}`);
            return resp.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);