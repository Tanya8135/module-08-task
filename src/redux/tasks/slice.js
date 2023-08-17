import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "redux/auth/operations";
import { fetchTasks, addTask, deleteTask } from "./operations";

/* Обробка різних станів взаємодії з асинхронними запитами або операціями.
Використовуються для збереження стану та інформації про завдання, що виконуються */
const handlePending = state => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

/* payload - вказує на дані, які передаються разом з дією для подальшої обробки 
в редюсері або іншому місці. Тобто це додаткові дані, які вказують, що саме 
потрібно зробити за станом додатка */

/* createSlice - створює дії (actions) для додавання, редагування, видалення.
Автоматично створює редюсер, який обробляє ці дії та змінює стан відповідно до 
їхнього типу даних */
const tasksSlice = createSlice({
    name: 'tasks', /* назва дій (action) для генерування назви дій */
    initialState: { /* початковий стан */
        items: [], /* список завдань */
        isLoading: false,
        error: null,
    },
    extraReducers: {
        [fetchTasks.pending]: handlePending,
        [addTask.pending]: handlePending,
        [deleteTask.pending]: handlePending,
        [fetchTasks.rejected]: handleRejected,
        [addTask.rejected]: handleRejected,
        [deleteTask.rejected]: handleRejected,
        [fetchTasks.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items = action.payload; /* дані, які передаються разом з action, які обробляє рудюсер */
        },
        [addTask.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items.push(action.payload);
        },
        [deleteTask.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            const index = state.items.findIndex(
                task => task.id === action.payload.id
            );
            state.items.splice(index, 1);
        },
        [logOut.fulfilled](state) {
            state.items = [];
            state.error = null;
            state.isLoading = false;
        },
    },
});

export const tasksReducer = tasksSlice.reducer;