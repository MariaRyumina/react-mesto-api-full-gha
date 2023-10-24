import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Card({
                                 card,
                                 onCardOpenClick,
                                 onConfirmDeleteCard,
                                 onCardLike
}) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = ( `element__like ${isLiked ? 'element__like_active' : ''}` );

    function handleCardOpenClick() {
        onCardOpenClick(card);
    }

    function handleCardLike() {
        onCardLike(card);
    }

    function handleConfirmDeleteClick() {
        onConfirmDeleteCard(card);
    }

    return (
        <article className="element">
            {isOwn && <button className="element__delete" aria-label="Удалить" type="button" onClick={handleConfirmDeleteClick} />}
            <img alt={card.name} className="element__img" src={card.link} onClick={handleCardOpenClick} />
            <div className="element__container">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-group">
                    <button className={cardLikeButtonClassName} aria-label="Нравится" type="button" onClick={handleCardLike} />
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}
