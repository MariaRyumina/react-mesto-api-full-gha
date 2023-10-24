import React from 'react';

export default function ImagePopup({ card, isOpen, onClose }) {

    return(
        <div className={`popup popup_content_image ${isOpen ? 'popup_opened' : ''}`}>
            <figure className="popup__image">
                <button className="popup__close" aria-label="Закрыть" type="button" onClick={onClose} />
                <img alt={card.name} src={card.link} className="popup__img" />
                <figcaption className="popup__img-caption">{card.name}</figcaption>
            </figure>
        </div>
    )
}