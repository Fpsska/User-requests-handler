import React from 'react';

import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import './header.scss';

// /. imports

const Header: React.FC = () => {

    const { tableData } = useAppSelector(state => state.tableSlice);

    const dispatch = useAppDispatch();

    return (
        <header className="header">
            <div className="header__wrapper">
                <nav className="nav">
                    <ul className="nav__menu">
                        <li className="nav__item">
                            <NavLink className="nav__link" to="/">Main</NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink className="nav__link" to="Users">Users</NavLink>
                        </li>
                        <li className="nav__item">
                            <NavLink className="nav__link" to="Posts">Posts</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
