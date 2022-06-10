import React, { useEffect } from 'react';

import { Outlet } from 'react-router';

import Header from '../Header/Header';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { fetchUsersData } from '../../app/slices/tableSlice';
import { switchTableDataLoadingStatus } from '../../app/slices/tableSlice';

// /. imports

const Layout: React.FC = () => {

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
        <div className="page">
            <Header />
            <main className="main">
                <Outlet />
            </main>
            <footer></footer>
        </div>
    );
};

export default Layout;