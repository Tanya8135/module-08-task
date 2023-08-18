import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import TaskList from "components/TaskList/TaskList";
import TaskEditor from "components/TaskEditor/TaskEditor";
import { fetchTasks } from "redux/tasks/operations";
import { selectLoading } from "redux/tasks/selectors";

export default function Tasks() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectLoading);

    /* useEffect - використовується для встановлення ефектів, які відбуваються пілся рендерингу компонента.
    Тобто fetchTasks() відбудиться після того, як компонент з'явився на екрані.
    [dispatch] - масив залежностей. Це вказує, що useEffect повинен виконатися 
    лише у тому випадку, якщо значення залежностей змінилося. Тобто, якщо значення 
    dispatch буде змінюватися, то useEffect буде виконано знову */
    /* Цей код виконує завантаження завдань за допомогою функціїї fetchTasks() після того,
    як компонент був відображений, і відслідковує зміни dispatch, щоб визначити, 
    чи потрібно виконувати ефект знову */
    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <title>Your tasks</title>
            </Helmet>
            <TaskEditor />
            <div>{isLoading && 'Request in progress...'}</div>
            <TaskList />
        </>
    )
}