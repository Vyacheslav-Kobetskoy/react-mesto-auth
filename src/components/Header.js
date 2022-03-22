function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__auth">{props.headerAuthMessage}</div>
    </header>
  );
}

export default Header;
