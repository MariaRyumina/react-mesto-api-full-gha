import React from 'react';
import logoImg from '../../images/logo_place_header.svg';
import '../../index.css';
import { Link, Routes, Route } from 'react-router-dom';

export default function Header({ email, setLoggedIn }) {
    function logout() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
    }

    return(
        <header className="header">
            <img src={logoImg} alt="лого Место" className="logo" />
            <Routes>
                <Route path='/cards'
                    element={
                        <div className="header__auth">
                            <p className="header__auth-email">{email}</p>
                            <Link to="/signin" onClick={logout} className="header__auth">Выход</Link>
                        </div>
                    }
                />
                <Route path='/signin'
                       element={
                           <div className="header__auth">
                                <Link to="/signup" className="header__auth">Регистрация</Link>
                           </div>
                       }
                />
                <Route path='/signup'
                       element={
                           <div className="header__auth">
                               <Link to="/signin" className="header__auth">Войти</Link>
                           </div>
                }/>
            </Routes>
        </header>
    )
}
