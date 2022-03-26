import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" noValidate>
        <input
          className="auth__input-text"
          type="email"
          placeholder="Email"
          minLength="2"
          maxLength="30"
          required
        />

        <input
          className="auth__input-text "
          type="password"
          placeholder="Пароль"
          required
        />

        <input
          type="submit"
          value="Зарегистрироваться"
          className="btn-hover auth__save-btn"
        />
      </form>
      <Link to="/sign-in" className="auth__login-link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}
export default Register;
