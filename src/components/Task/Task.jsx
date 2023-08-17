import { useDispatch } from 'react-redux';
import { deleteTask } from 'redux/tasks/operations';

import css from './Task.module.css';

const Task = ({ id, text }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteTask(id));

  return (
    <div className={css.wrapper}>
      <p className={css.text}>{text}</p>
      <button className={css.btn} type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Task;
