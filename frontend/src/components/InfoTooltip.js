import React from 'react';
import failIcon from '../images/fail-icon.svg';
import successIcon from '../images/success-icon.svg';

function InfoTooltip({isOpen, onClose, success}) {
  return (
    <section className={`popup popup_opacity_dark ${isOpen && 'popup_display_active'}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-btn button" onClick={onClose}></button>
        <div className="popup__info">
          <img className="popup__icon" src={success ? successIcon : failIcon} alt={success ? "Успешно" : "Ошибка"}></img>
          <p className="popup__tooltip">
            {success ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
      </div>
    </section>
  )
}

export default InfoTooltip;
