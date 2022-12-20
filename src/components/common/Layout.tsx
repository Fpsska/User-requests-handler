import React, { useEffect } from 'react';

import { Outlet } from 'react-router';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Theme from '../Theme/Theme';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { switchTableDataLoadingStatus } from '../../app/slices/tableSlice';
import { switchPostDataLoadingStatus } from '../../app/slices/postSlice';

import { fetchUsersData } from '../../app/api/fetchUsersData';
import { fetchPostsData } from '../../app/api/fetchPostsData';

// /. imports

const Layout: React.FC = () => {
    const { fetchUsersStatus } = useAppSelector(state => state.tableSlice);
    const { fetchPostsStatus } = useAppSelector(state => state.postSlice);
    const dispatch = useAppDispatch();

    // /. hooks

    useEffect(() => {
        dispatch(fetchUsersData());
        dispatch(fetchPostsData());
    }, []);

    useEffect(() => {
        setTimeout(() => {
            dispatch(switchTableDataLoadingStatus(false));
        }, 3500);
    }, [fetchUsersStatus]);

    useEffect(() => {
        setTimeout(() => {
            dispatch(switchPostDataLoadingStatus(false));
        }, 3500);
    }, [fetchPostsStatus]);

    // /. effects

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
