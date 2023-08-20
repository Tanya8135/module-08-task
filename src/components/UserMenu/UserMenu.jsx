import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import { useAuth } from 'hooks';

import css from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth(); /* це замість useSelector(selectUser) */

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcom, {user.name}</p>
      {/* dispatch(logOut() - берет из operations.js folder redux/auth */}
      <button type="button" onClick={() => dispatch(logOut())}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
