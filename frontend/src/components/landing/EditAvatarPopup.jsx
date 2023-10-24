import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef();

    function cleanInputs() {
        avatarRef.current.value = ''
    }

    function handleSubmit() {
        onUpdateAvatar({
            avatar: avatarRef.current.value
        })
        cleanInputs()
    }

    function closeEditPopup() {
        onClose();
        cleanInputs();
    }

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="edit-avatar"
            isOpen={isOpen}
            onClose={closeEditPopup}
            onSubmit={handleSubmit}
            buttonText='Сохранить'
            buttonTextLoading='Сохранение...'
        >
            <input ref={avatarRef} id="link-avatar" className="popup__input popup__input_value_link" type="url"
                   placeholder="Ссылка на картинку" name="avatar" required />
            <span id="link-avatar-error" className="popup__input-error" />
        </PopupWithForm>
    )
}
