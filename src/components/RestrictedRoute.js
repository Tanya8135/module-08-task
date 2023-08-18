import { Navigate } from "react-router-dom";

import { useAuth } from "hooks";

/**
 * - If the route is restricted and the user is logged in, render a <Navigate> to redirectTo
 * Якщо маршрут обмежений і користувач увійшов у систему, відрендерити <Navigate> для переспрямування
 * - Otherwise render the component
 * Інакше відрендерити компонент
 */

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};