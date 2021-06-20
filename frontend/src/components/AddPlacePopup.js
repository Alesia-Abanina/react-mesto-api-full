import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  React.useEffect(() => {
    nameRef.current.value = '';
    linkRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm name="place" title="Новое место" buttonText="Создать"
      isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input type="text" ref={nameRef} id="place-input" className="form__item form__item_el_name" name="name" placeholder="Название" minLength="2" maxLength="30" required />
      <span className="form__item-error place-input-error"></span>
      <input type="url" ref={linkRef} id="link-input" className="form__item form__item_el_link" name="link" placeholder="Ссылка на картинку" required />
      <span className="form__item-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
