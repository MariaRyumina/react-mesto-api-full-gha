import React from 'react';

export default function Login({ onAuthorization }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onAuthorization( email, password );
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    return (
        <div className="login">
            <p className="login__title">Вход</p>
            <form onSubmit={handleSubmit} className="login__form" noValidate>
                <input id="login-email" type="email" placeholder="Email" name="email" required
                       value={email} onChange={handleChangeEmail} className="login__input login__input_value_email" />
                <span id="email-error" className="login__input-error" />
                <input id="login-password" type="password" placeholder="Пароль" name="password" required
                       value={password} onChange={handleChangePassword} className="login__input login__input_value_password" />
                <span id="password-error" className="login__input-error" />
                <button type="submit" className="login__button">Войти</button>
            </form>
        </div>
    )
}
