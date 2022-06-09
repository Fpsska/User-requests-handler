import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import Form from '../../Form/Form';
import Table from '../../Table/Table';

import { fetchUsersData } from '../../../app/slices/tableSlice';
import { switchTableDataLoadingStatus } from '../../../app/slices/tableSlice';

import './mainPage.scss';

// /. imports

const MainPage: React.FC = () => {

    const { status } = useAppSelector(state => state.tableSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsersData());
    }, []);

    useEffect(() => {
        if (status === 'loading') {
            setTimeout(() => {
                dispatch(switchTableDataLoadingStatus(true));
            }, 3500);
        } else {
            setTimeout(() => {
                dispatch(switchTableDataLoadingStatus(false));
            }, 3500);
        }
    }, [status]);

    return (
        <div className="main-page">
            <div className="main-page__wrapper">
                <Form />
                <Table />
            </div>
        </div>
    );
};

export default MainPage;
