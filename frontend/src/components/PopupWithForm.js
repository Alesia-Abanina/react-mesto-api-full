import React from 'react';

function PopupWithForm({ name, title, buttonText, isOpen, onClose, onSubmit, children }) {
  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_display_active'}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-btn button" onClick={onClose}></button>
        <h2 className="popup__heading">{title}</h2>
        <form className="form" name={`form_${name}`} onSubmit={onSubmit} noValidate>
          <fieldset className="form__input-container">
            {children}
            <button type="submit" className="button form__submit">{buttonText}</button>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
