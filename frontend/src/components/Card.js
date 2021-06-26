import React from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `button element__delete ${!isOwn && 'element__delete_hidden'}`
  );

  const isLiked = card.likes.some(id => id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like button ${isLiked && 'element__like_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <img src={card.link} alt={card.name} className="element__img" onClick={handleClick} />
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-block">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="element__like-number">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
