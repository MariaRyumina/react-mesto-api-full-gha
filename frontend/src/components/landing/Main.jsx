import '../../index.css';
import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Main({
                                 onEditProfile,
                                 onAddCard,
                                 onEditAvatar,
                                 onCardOpenClick,
                                 onConfirmDeleteCard,
                                 onCardLike,
                                 cards
}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-group">
                    <img alt="аватар" className="profile__avatar" src={currentUser.avatar} />
                    <div className="profile__avatar-cover">
                        <button className="profile__avatar-edit" type="button" onClick={onEditAvatar} />
                    </div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button className="profile__button-edit" type="button" onClick={onEditProfile} />
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button className="profile__button-add" type="button" onClick={onAddCard} />
            </section>
            <section className="elements">
                {cards.map(card => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardOpenClick={onCardOpenClick}
                        onConfirmDeleteCard={onConfirmDeleteCard}
                        onCardLike={onCardLike}
                    />
                ))}
            </section>
        </main>
    )
}
