import React from "react";
import { Link,} from "react-router-dom";
import { apiAuth } from "../utils/Api.js";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }
  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    apiAuth.registerUser(password, email)
  }
  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <input
          className="auth__input-text"
          type="email"
          placeholder="Email"
          minLength="2"
          maxLength="30"
          value={email || ""}
          onChange={handleChangeEmail}
          required
        />

        <input
          className="auth__input-text "
          type="password"
          placeholder="Пароль"
          value={password || ""}
          onChange={handleChangePassword}
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
