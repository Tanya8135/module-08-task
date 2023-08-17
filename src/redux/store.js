import { configureStore } from "@reduxjs/toolkit"; /* Використовується для створення Redux-стору з налаштованими опціями */
import {
    persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist'; /* різних констант ті ф-ій з бібліотеки redux-persist, яка допомогає зберігати стан між сеансами браузера */
import storage from 'redux-persist/lib/storage'; /* для збереження  стану в локальному сховищі браузера */
// import { tasksReducer } from './tasks/';
import { authReducer } from "./auth/slice";

const authPersistConfig = { /* для збереження стану автентифікації (auth) */
    key: 'auth', /* вказуються ключ, сховища, та поля - які потрібно зберігати */
    storage,
    whitelist: ['token'],
};

export const store = configureStore({ /* створення Redux-стор */
    reducer: {
        auth: persistReducer(authPersistConfig, authReducer),
        // tasks: tasksReducer,
    },
    middleware: getDefaultMiddleware => /* для обробки серіалізованих дій (action) */
        getDefaultMiddleware({ /* тобто для здатності зберігати та відновлючати стан додатку */
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store); /* створення об'єкта для збереження стану у сховище */