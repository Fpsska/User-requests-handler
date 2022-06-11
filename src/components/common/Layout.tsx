import React, { useEffect } from 'react';

import { Outlet } from 'react-router';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { fetchUsersData } from '../../app/slices/tableSlice';
import { fetchPostsData } from '../../app/slices/postSilce';

import { switchTableDataLoadingStatus } from '../../app/slices/tableSlice';
import { switchPostDataLoadingStatus } from '../../app/slices/postSilce';

// /. imports

const Layout: React.FC = () => {

    const { status } = useAppSelector(state => state.tableSlice);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsersData());
        dispatch(fetchPostsData());
    }, []);

    useEffect(() => {
        if (status === 'loading') {
            setTimeout(() => {
                dispatch(switchTableDataLoadingStatus(true));
                dispatch(switchPostDataLoadingStatus(true));
            }, 3500);
        } else {
            setTimeout(() => {
                dispatch(switchTableDataLoadingStatus(false));
                dispatch(switchPostDataLoadingStatus(false));
            }, 3500);
        }
    }, [status]);

    return (
        <div className="page">
            <Header />
            <main className="main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;