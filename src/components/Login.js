import React from "react";

function Login(props) {
  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
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
          value="Войти"
          className="btn-hover auth__save-btn"
        />
      </form>
    </div>
  );
}
export default Login;
