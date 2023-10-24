import React from 'react';

export default function PopupWithForm({ title, name, isOpen, onClose, children, onSubmit, buttonText }) {
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit();
    }

    return (
        <div className={`popup popup_content_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close" aria-label="Закрыть" type="button" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form className={`popup__form popup__form_${name}`} name={name} onSubmit={handleSubmit} noValidate>
                    {children}
                    <button className="popup__button popup__button_edit" type="submit">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}
