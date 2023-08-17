import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "redux/auth/operations";
import { fetchTasks, addTask, deleteTask } from "./operations";

/* Обробка різних станів взаємодії з асинхронними запитами або операціями.
Використовуються для збереження стану та інформації про завдання, що виконуються */
const handlePeding = state => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

