import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';
import css from './LoginForm.module.css';

export const LoginForm = () => {
  const dispatch = useDispatch(); /* викоистовується для відправки дій */
  /* Функція handleSubmit відповідає за відправку дії logIn до Redux store з введеними даними користувача при вході. */
  // handleSubmit - виконує обробку події подачі форми (submit event) при вході користувача.
  const handleSubmit = e => {
    /* приймає подію "e" як параметр. Викликається, коли користувач намагається відправити форму */
    e.preventDefault();
    const form =
      e.currentTarget; /* form - отримує доступ до  до DOM-елемента форми, яку користувач намагається відправити  */
    /* За допомогою dispatch відправляється дія - logIn до Redux store, передаючи об'єкт 
з електронною поштою (email) та паролем, які користувач ввів у відповідні поля форми. */
    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    /* Після відправки форми очищає поля форми */
    form.reset();
  };

  /* Кнопка викликає handleSubmit, який доданий на всю форму */
  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Email
        <input type="email" name="email" />
      </label>
      <label className={css.label}>
        Password
        <input type="password" name="password" />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
};
