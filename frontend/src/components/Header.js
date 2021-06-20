import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo-mesto.svg';

function Header({ email, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      {location.pathname === '/sign-up' && <Link to="sign-in" className="link">Войти</Link>}
      {location.pathname === '/sign-in' && <Link to="sign-up" className="link">Регистрация</Link>}
      {location.pathname === '/' &&
        <div>
          <span className="header__email">{email}</span>
          <Link to="sign-in" onClick={onSignOut} className="link">Выйти</Link>
        </div>
      }
    </header>
  )
}

export default Header;
