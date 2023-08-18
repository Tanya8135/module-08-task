import { useSelector } from "react-redux";
import { selectUser, selectIsLoggedIn, selectIsRefreshing } from "redux/auth/selectors";

/* спеціалізований хук для використання за допомогою бібліотеки react-redux 
для управління станом авторизації користувача та взаємодії з Redux store.  */
export const useAuth = () => {
    /* Селектори дозволяють вибрати конкретні частини стану зі store в компонентах,
    таким чином спрощуючи код та забезпечуючи більшу гнучкість, коли стан змінюється. */
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isRefreshing = useSelector(selectIsRefreshing);
    const user = useSelector(selectUser);

    return {
        isLoggedIn,
        isRefreshing,
        user,
    };
};

/* За допомогою цього хуку можна легко отримати доступ до інформації про стан авторизації у 
компоненті. Тобто більше не потрібно кодного разу викликати селектори та передавати
їх до useSelector, можна просто використовувати хук useAuth. */
/* Спрощує використання стану авторизації з Redux store, це більш зручніше використовувати,
та робить код чистішим. */