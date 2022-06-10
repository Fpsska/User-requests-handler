import React from 'react';

import { Link } from 'react-router-dom';

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
                            <Link className="nav__link" to="/CodeConstruction-Task">Main</Link>
                        </li>
                        <li className="nav__item">
                            <Link className="nav__link" to="/CodeConstruction-Task">Users</Link>
                        </li>
                        <li className="nav__item">
                            <Link className="nav__link" to="/CodeConstruction-Task">Posts</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
