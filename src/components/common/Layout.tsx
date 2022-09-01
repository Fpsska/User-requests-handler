import React, { useEffect } from 'react';

import { Outlet } from 'react-router';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Theme from '../Theme/Theme';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { fetchUsersData } from '../../api/fetchUsersData';

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
            }, 1800);
        } else {
            setTimeout(() => {
                dispatch(switchTableDataLoadingStatus(false));
            }, 1800);
        }
    }, [status]);

    return (
        <div className="page">
            <Theme />
            <Header />
            <main className="main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;