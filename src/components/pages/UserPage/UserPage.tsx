import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';


import './userPage.scss';

// /. imports

const UserPage: React.FC = () => {

    const {
        isTableDataLoading,
        tableData
    } = useAppSelector(state => state.tableSlice);

    const dispatch = useAppDispatch();

    return (
        <div className="user-page">
            <div className="user-page__wrapper">
                <div className="users">
                    {
                        tableData.map(item => {
                            return (
                                <ul className="user" key={item.id}>
                                    <li className="user__information">Name: <span>{item.name}</span></li>
                                    <li className="user__information">Username: <span>{item.username}</span></li>
                                    <li className="user__information">Phone: <span>{item.phone}</span></li>
                                    <li className="user__information">Email: <span>{item.email}</span></li>
                                    <li className="user__information">City: <span>{item.address.city}</span></li>
                                </ul>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default UserPage;
