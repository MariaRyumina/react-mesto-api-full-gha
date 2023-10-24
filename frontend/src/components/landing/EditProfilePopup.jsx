import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen])

    function handleSubmit() {
        onUpdateUser({
            name,
            about
        })
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeAbout(e) {
        setAbout(e.target.value);
    }

    return(
        <CurrentUserContext.Provider value={currentUser}>
            <PopupWithForm
                title="Редактировать профиль"
                name="edit"
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={handleSubmit}
                buttonText='Сохранить'
                buttonTextLoading='Сохранение...'
            >
                <input id="name" className="popup__input popup__input_value_name" type="text" placeholder="Имя" name="name"
                       minLength="2" maxLength="40" required value={name || ''} onChange={handleChangeName} />
                <span id="name-error" className="popup__input-error" />
                <input id="about" className="popup__input popup__input_value_about" type="text" placeholder="О себе" name="about"
                       minLength="2" maxLength="200" required value={about || ''} onChange={handleChangeAbout} />
                <span id="about-error" className="popup__input-error" />
            </PopupWithForm>
        </CurrentUserContext.Provider>
    )
}
