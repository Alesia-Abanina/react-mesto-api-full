import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const imageRef = React.useRef();

  React.useEffect(() => {
    imageRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: imageRef.current.value,
    });
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить"
      isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input type="url" ref={imageRef} id="avatar-link-input" className="form__item form__item_el_link" name="avatar" placeholder="Ссылка на картинку" required />
      <span className="form__item-error avatar-link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
