import React, { useEffect, useState } from 'react';

import { IoDocumentTextOutline } from 'react-icons/io5';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { setRequestСount } from '../../app/slices/tableSlice';

import './header.scss';

// /. imports

const Header: React.FC = () => {

    const { requestСount, isTableDataLoading, tableData } = useAppSelector(state => state.tableSlice);
    const [text, setText] = useState<string>('заявок');

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setRequestСount(tableData.length));

        if (requestСount >= 5 || requestСount === 0) {
            setText('заявок');
        } else if (requestСount >= 2 || requestСount <= 4) {
            setText('заявки');
        } else if (requestСount === 1) {
            setText('заявка');
        };
    }, [requestСount, tableData]);

    return (
        <header className="header">
            <div className="header__wrapper">
                <div className="header__result relult">
                    <div className="relult__wrapper">
                        <IoDocumentTextOutline size={'34px'} />
                        <h1 className="relult__text">{isTableDataLoading ? '0' : requestСount} {text}</h1>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
