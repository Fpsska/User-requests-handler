import React from 'react';

import { IoDocumentTextOutline } from 'react-icons/io5';

import { useAppSelector } from '../../app/hooks';

import './header.scss';

// /. imports

const Header: React.FC = () => {

    const { requestСount, isTableDataLoading } = useAppSelector(state => state.tableSlice);

    return (
        <header className="header">
            <div className="header__wrapper">
                <div className="header__result relult">
                    <div className="relult__wrapper">
                        <IoDocumentTextOutline size={'34px'} />
                        <h1 className="relult__text">{isTableDataLoading ? '0' : requestСount} заявок</h1>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
