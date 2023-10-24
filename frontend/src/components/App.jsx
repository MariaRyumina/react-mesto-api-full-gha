import React from 'react';
import Header from './landing/Header.jsx';
import Main from './landing/Main.jsx';
import Footer from './landing/Footer.jsx';
import '../index.css';
import PopupWithForm from "./landing/PopupWithForm";
import ImagePopup from "./landing/ImagePopup";
import { api } from "../utils/Api";
import { auth } from "../utils/Auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./landing/EditProfilePopup";
import EditAvatarPopup from "./landing/EditAvatarPopup";
import AddCardPopup from "./landing/AddCardPopup";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import imgAuthYes from '../images/auth_yes.png';
import imgAuthNo from '../images/auth_no.png';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
    const [cardToDelete, setCardToDelete] = React.useState({}); //карточка, которую необходимо удалить
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({}); //выбранная карточка, для открытия во весь размер
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false); //содержит статус пользователя — вошёл он в систему или нет
    const [informationInfoTooltip, setInformationInfoTooltip] = React.useState({ img: null, msg: null }); //информация в попапе InfoTooltip
    const [email, setEmail] = React.useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        handleTokenCheck()
    }, [])

    //загрузка информации о пользователе и карточек с сервера
    React.useEffect(() => {
        if(loggedIn) {
            Promise.all([api.getUserInfo(), api.getCardList()])
                .then(([resultUser, resultCard]) => {
                    setCurrentUser(resultUser)
                    setCards(resultCard)
                })
                .catch(err => console.log(`Ошибка загрузки с сервера: ${err}`))
        }
    }, [loggedIn])

    //регистрация
    function handleRegistration( email, password ) {
        auth.register( email, password )
            .then(res => {
                if (res) {
                    handleInformationInfoTooltip(imgAuthYes, 'Вы успешно зарегистрировались!')
                    handleInfoTooltipClick();
                    navigate('sign-in');
                }
            })
            .catch(err => {
                console.error(`Ошибка регистрации: ${err}`);
                handleInformationInfoTooltip(imgAuthNo, 'Что-то пошло не так! Попробуйте ещё раз.');
                handleInfoTooltipClick();
            })
    }

    //авторизация
    function handleAuthorization( email, password ) {
        auth.authorize( email, password )
            .then(res => {
                if(res) {
                    setLoggedIn(true);
                    setEmail(email);
                    navigate('/');
                }
            })
            .catch(err => {
                console.error(`Ошибка авторизации: ${err}`);
                handleInformationInfoTooltip(imgAuthNo, 'Что-то пошло не так! Попробуйте ещё раз.');
                handleInfoTooltipClick();
            })
    }

    //проверка токена на валидность
    function handleTokenCheck() {
        const token = localStorage.getItem('token');
        if(token) {
            auth.checkToken(token)
                .then(res => {
                    if (res) {
                        setLoggedIn(true);
                        setEmail(res.data.email);
                        navigate("/");
                    }
                })
                .catch(err => console.log(`Ошибка запроса проверки токена: ${err}`))
        }
    }

    //загрузка новой информации о пользователе на сервер
    function handleUpdateUser({ name, about }) {
        api.patchUserInfo({ name, about })
            .then(resultUser => {
                setCurrentUser(resultUser);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка отправки данных о пользователе на сервер: ${err}`))
    }

    //загрузка нового аватара на сервер
    function handleUpdateAvatar({ avatar }) {
        api.updateUserAvatar({ avatar })
            .then(avatar => setCurrentUser(avatar))
            .then(() => closeAllPopups())
            .catch(err => console.log(`Ошибка обновления аватара: ${err}`))
    }

    //запрос на лайк/дизлайк карточки и получение обновленных данных карточки
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then(newCard => setCards(state => state.map(c => c._id === card._id ? newCard : c)))
            .catch(err => console.log(`Ошибка поддержки лайков/дизлайков: ${err}`))
    }

    //запрос на удаление карточки
    function handleCardDelete() {
        api.deleteCard(cardToDelete._id)
            .then(() => setCards(cards => cards.filter(c => c._id !== cardToDelete._id)))
            .then(() => closeAllPopups())
            .catch(err => console.log(`Ошибка удаления карточки: ${err}`))
    }

    //запрос на добавление новой карточки на сервер
    function handleAddCardSubmit({ name, link }) {
        api.addCard({ name, link })
            .then(newCard => setCards([newCard, ...cards]))
            .then(() => closeAllPopups())
            .catch(err => console.log(`Ошибка добавления новой карточки на сервер: ${err}`))
    }

    //изменение картинки и сообщения в попапе InfoTooltip при регистрации и авторизации
    function handleInformationInfoTooltip(img, msg){
        setInformationInfoTooltip({ img, msg })
    }

    //открытие popup InfoTooltip
    function handleInfoTooltipClick() {
        setIsInfoTooltipOpen(true)
    }

    //открытие popup edit avatar
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    //открытие popup edit profile
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    //открытие popup add card
    function handleAddCardClick() {
        setIsAddCardPopupOpen(true)
    }

    //открытие popup confirm delete card
    function handleConfirmDeleteCardClick(card) {
        setIsDeleteCardPopupOpen(true)
        setCardToDelete(card)
    }

    //открытие popup image
    function handleCardOpenClick(card) {
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddCardPopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsDeleteCardPopupOpen(false)
        setIsInfoTooltipOpen(false)
        setCardToDelete({})
        setSelectedCard({})
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    loggedIn={loggedIn}
                    email={email}
                    setLoggedIn={setLoggedIn}
                />
                <Routes>
                    <Route
                        path='/*'
                        element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
                    />
                    <Route
                        path='/'
                        element={ <ProtectedRoute
                            element={Main}
                            onEditProfile={handleEditProfileClick}
                            onAddCard={handleAddCardClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardOpenClick={handleCardOpenClick}
                            onConfirmDeleteCard={handleConfirmDeleteCardClick}
                            onCardLike={handleCardLike}
                            cards={cards}
                            loggedIn={loggedIn}
                        />
                        }
                    />
                    <Route
                        path='/sign-in'
                        element={
                            <Login
                                onAuthorization={handleAuthorization}
                            />
                        }
                    />
                    <Route
                        path='/sign-up'
                        element={
                            <Register
                                onRegister={handleRegistration}
                            />
                        }
                    />
                </Routes>

                <Footer />

                <InfoTooltip
                    img={informationInfoTooltip.img}
                    title={informationInfoTooltip.msg}
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                />

                <PopupWithForm
                    title="Вы уверены?"
                    name="delete"
                    isOpen={isDeleteCardPopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleCardDelete}
                    buttonText='Да'
                    buttonTextLoading='Удаление...'
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <AddCardPopup
                    isOpen={isAddCardPopupOpen}
                    onClose={closeAllPopups}
                    onAddCard={handleAddCardSubmit}
                />

                <ImagePopup
                    card={selectedCard}
                    isOpen={!!selectedCard.name}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
