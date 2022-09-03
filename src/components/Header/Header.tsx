import React from 'react';

import { NavLink } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';

import { switchMainPageStatus } from '../../app/slices/tableSlice';

import './header.scss';

// /. imports

const Header: React.FC = () => {

    const dispatch = useAppDispatch();

    return (
        <header className="header">
            <section className="header__wrapper">
                <nav className="nav">
                    <ul className="nav__menu">
                        <li className="nav__item">
                            <NavLink className="nav__link"
                                to="/CodeConstruction-Task/"
                                onClick={() => dispatch(switchMainPageStatus(true))}
                            >
                                Main
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink className="nav__link"
                                to="Users"
                                onClick={() => dispatch(switchMainPageStatus(false))}
                            >
                                Users
                            </NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink className="nav__link"
                                to="Posts"
                                onClick={() => dispatch(switchMainPageStatus(false))}
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
