import React, {useState} from 'react';
import logoImg from '../../images/logo_place_header.svg';
import '../../index.css';
import { Link, Routes, Route } from "react-router-dom";

export default function Header({ email, setLoggedIn }) {
    function logout() {
        localStorage.removeItem('token');
        setLoggedIn(false);
    }

    return(
        <header className="header">
            <img src={logoImg} alt="лого Место" className="logo" />
            <Routes>
                <Route path="/"
                       element={
                            <div className="header__auth">
                                <p className="header__auth-email">{email}</p>
                                <Link to="/sign-in" onClick={logout} className="header__auth">Выход</Link>
                            </div>
                       }
                />
                <Route path="/sign-in"
                       element={
                           <div className="header__auth">
                                <Link to="/sign-up" className="header__auth">Регистрация</Link>
                           </div>
                       }
                />
                <Route path="/sign-up"
                       element={
                           <div className="header__auth">
                               <Link to="/sign-in" className="header__auth">Войти</Link>
                           </div>
                }/>
            </Routes>
        </header>
    )
}
