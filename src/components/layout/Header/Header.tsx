import React from 'react';

import { NavLink } from 'react-router-dom';

import './header.scss';

// /. imports

const Header: React.FC = () => {
    return (
        <header className="header">
            <section className="header__wrapper">
                <nav className="nav">
                    <ul className="nav__menu">
                        <li className="nav__item">
                            <NavLink
                                className="nav__link"
                                to="/User-requests-handler/"
                                // state={'mainPage'}
                            >
                                Main
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink
                                className="nav__link"
                                to="Users"
                            >
                                Users
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink
                                className="nav__link"
                                to="Posts"
                            >
                                Posts
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </section>
        </header>
    );
};

export default Header;
