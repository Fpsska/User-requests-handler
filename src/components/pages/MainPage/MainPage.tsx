import React, { useState, useEffect } from 'react';

import { IoDocumentTextOutline } from 'react-icons/io5';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import { setRequestCount, filterUsers } from '../../../app/slices/tableSlice';

import { declinateByCount } from '../../../helpers/declinateByCount';

import Form from '../../Form/Form';
import Table from '../../Table/Table';

import './mainPage.scss';

// /. imports

const MainPage: React.FC = () => {
    const { requestСount, isTableDataLoading, filteredTableData } =
        useAppSelector(state => state.tableSlice);

    const [text, setText] = useState<string>('заявок');

    const dispatch = useAppDispatch();

    // /. hooks

    useEffect(() => {
        dispatch(setRequestCount(filteredTableData.length));
        setText(
            declinateByCount(filteredTableData.length, [
                'заявка',
                'заявки',
                'заявок'
            ])
        );
    }, [filteredTableData]);

    useEffect(() => {
        return () => {
            // reset filtering when page is re-rendered
            dispatch(filterUsers({ filterProp: '', value: '' }));
        };
    }, []);

    // /. effects

    return (
        <section className="main-page">
            <div className="main-page__wrapper">
                <div className="result">
                    <div className="result__wrapper">
                        <IoDocumentTextOutline
                            size={'34px'}
                            color={'#000'}
                        />
                        <h1
                            className="result__text"
                            data-testid="counter"
                        >
                            {isTableDataLoading ? '0' : requestСount} {text}
                        </h1>
                    </div>
                </div>
                <Form />
                <Table />
            </div>
        </section>
    );
};

export default MainPage;
