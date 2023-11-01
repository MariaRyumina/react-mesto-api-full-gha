import React from "react";

export default function InfoTooltip ({ title, img, isOpen, onClose }) {

    return (
        <div className={`popup popup_content_info ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close" aria-label="Закрыть" type="button" onClick={onClose}></button>
                <div className="popup__auth-status">
                    <img src={img} className="popup__auth-img" />
                    <h2 className="popup__auth-title">{title}</h2>
                </div>
            </div>
        </div>
    )
}
