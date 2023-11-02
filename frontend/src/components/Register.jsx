import React from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister } ) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault()
        onRegister( email, password );
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    return(
        <div className="register">
            <p className="register__title">Регистрация</p>
            <form onSubmit={handleSubmit}  className="register__form" noValidate>
                <input id="register-email" type="email" placeholder="Email" name="email" required
                       value={email} onChange={handleChangeEmail} className="register__input register__input_value_email" />
                <span id="email-error" className="register__input-error" />
                <input id="register-password" type="password" placeholder="Пароль" name="password" required
                       value={password} onChange={handleChangePassword} className="register__input register__input_value_password" />
                <span id="password-error" className="register__input-error" />
                <button type="submit" className="register__button">Зарегистрироваться</button>
            </form>
            <p className="register__subtitle">Уже зарегистрированы?
                <Link to='/signin' className="register__subtitle-link">Войти</Link>
            </p>
        </div>
    )
}
