import React from 'react';

import { IoDocumentTextOutline } from 'react-icons/io5';

import './header.scss';

// /. imports

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__wrapper">
                <div className="header__result relult">
                    <div className="relult__wrapper">
                        <IoDocumentTextOutline size={'34px'} />
                        <h1 className="relult__text">1164 заявок</h1>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
