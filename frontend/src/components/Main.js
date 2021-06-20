import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Footer from './Footer';

function Main({ cards, onCardLike, onCardDelete, onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <img alt="Фото автора" className="profile__img" src={currentUser.avatar} />
        </div>
        <div className="profile__info">
          <div className="profile__title-info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" className="profile__edit button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add button" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card key={card._id} onCardClick={onCardClick} onCardLike={onCardLike}
              onCardDelete={onCardDelete} card={card} />
          ))}
        </ul>
      </section>
      <Footer />
    </main>
  );
}

export default Main;
