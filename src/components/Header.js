import React from "react";
import { Link, Switch, Route } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <Switch>
        <Route path="/sign-in">
          <Link className="header__auth" to="/sign-up">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link className="header__auth" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route path="/main">
          <div className="header__auth">
          <span className="header__email">{props.email}</span>
            <Link
              className="header__relogin"
              to="/sign-in"
              onClick={props.handleReLogin}
            >
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
