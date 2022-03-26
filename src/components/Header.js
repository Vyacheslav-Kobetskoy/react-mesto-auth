import React from "react";
import { useLocation, Link } from "react-router-dom";

function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__logo"></div>
      {location.pathname === "/sign-in" ? (
        <Link className="header__auth" to="/sign-up">
          Регистрация
        </Link>
      ) : (
        ""
      )}

      {location.pathname === "/sign-up" ? (
        <Link className="header__auth" to="/sign-in">
          Войти
        </Link>
      ) : (
        ""
      )}

      
    </header>
  );
}

export default Header;
