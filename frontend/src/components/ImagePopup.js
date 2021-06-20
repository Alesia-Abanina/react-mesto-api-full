import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <section className={`popup image-popup popup_opacity_dark ${card && 'popup_display_active'}`}>
      <div className="popup__image-container">
        <button type="button" className="popup__close-btn button" onClick={onClose}></button>
        <figure className="popup__figure">
          <img src={card.link} alt={card.name} className="popup__image" />
          <figcaption className="popup__image-caption">{card.name}</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default ImagePopup;
