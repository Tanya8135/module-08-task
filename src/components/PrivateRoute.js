import { Navigate } from "react-router-dom";

import { useAuth } from "hooks";

/**
 * - If the route is private and the user is logged in, render the component
 * Якщо маршрут приватний і користувач увійшов у систему, то повинен відповісти компонент
 * - Otherwise render <Navigate> to redirectTo
 * Інакше рендерити <Navigate> для перенаправлення
 */

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
    const { isLoggedIn, isRefreshing } = useAuth();
    const shouldRedirect = !isLoggedIn && !isRefreshing;

    return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
