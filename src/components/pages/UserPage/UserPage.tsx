import React from 'react';

import { useAppSelector } from '../../../app/hooks';

import Preloader from '../../common/Preloader/Preloader';

import './userPage.scss';

// /. imports

const UserPage: React.FC = () => {
    const { isTableDataLoading, fetchUsersErrMsg, tableData } = useAppSelector(
        state => state.tableSlice
    );

    return (
        <section className="user-page">
            <div className="user-page__wrapper">
                {isTableDataLoading ? (
                    <div className="user-page__preloader">
                        <Preloader />
                    </div>
                ) : (
                    <div className="users">
                        {tableData?.map(item => {
                            return (
                                <ul
                                    className="user"
                                    key={item.id}
                                >
                                    <li className="user__information">
                                        Name: <span>{item.name}</span>
                                    </li>
                                    <li className="user__information">
                                        Username: <span>{item.username}</span>
                                    </li>
                                    <li className="user__information">
                                        Phone: <span>{item.phone}</span>
                                    </li>
                                    <li className="user__information">
                                        Email: <span>{item.email}</span>
                                    </li>
                                    <li className="user__information">
                                        City: <span>{item.address.city}</span>
                                    </li>
                                </ul>
                            );
                        })}
                        {!isTableDataLoading && fetchUsersErrMsg && (
                            <span className="error-message">
                                Error: {fetchUsersErrMsg}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default UserPage;
