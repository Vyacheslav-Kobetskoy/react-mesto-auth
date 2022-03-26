import React from "react";
import { apiAuth } from "../utils/Api.js";

function Login(props) {
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
    apiAuth.loginUser(password, email).then((data) => {
      localStorage.setItem('jwt',data.token)
    });

  }
  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
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
          value="Войти"
          className="btn-hover auth__save-btn"
        />
      </form>
    </div>
  );
}
export default Login;
