import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" buttonText="Сохранить"
      isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input type="text" id="name-input" className="form__item form__item_el_name" name="name"
        onChange={handleNameChange} value={name} minLength="2" maxLength="40" required />
      <span className="form__item-error name-input-error"></span>
      <input type="text" id="description-input" className="form__item form__item_el_description"
        onChange={handleDescriptionChange} value={description} name="about" minLength="2" maxLength="200" required />
      <span className="form__item-error description-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
