import React from 'react'
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <main className="content">
      <section className="auth">
        <div className="auth__container">
          <h2 className="auth__heading">Регистрация</h2>
          <form className="form auth__form" name={`form_register`} onSubmit={handleSubmit} noValidate>
            <fieldset className="form__input-container auth__fieldset">
              <div className="auth__fields">
                <input type="text" id="email-input" className="auth__input form__item form__item_el_email" name="email"
                  onChange={handleEmailChange} value={email} minLength="2" maxLength="40" placeholder="Email" required />
                <span className="form__item-error email-input-error"></span>
                <input type="password" id="password-input" className="auth__input form__item form__item_el_password"
                  onChange={handlePasswordChange} value={password} name="password" minLength="2" maxLength="200" placeholder="Пароль" required />
                <span className="form__item-error password-input-error"></span>
              </div>
              <div className="auth__confirmation">
                <button type="submit" className="auth__button button form__submit">Зарегистрироваться</button>
                <Link to="/sign-in" className="auth__link link">Уже зарегистрированы? Войти</Link>
              </div>
            </fieldset>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Register;
